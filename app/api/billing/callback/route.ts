import { NextResponse } from 'next/server';
import { checkPaymentStatus } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';

/**
 * PhonePe v2 redirects user here after payment attempt.
 * URL params: orderId, transactionId, state (COMPLETED|FAILED|PENDING)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId') || searchParams.get('transactionId');
    const state = searchParams.get('state');

    if (!orderId) {
      return NextResponse.redirect(new URL('/pricing?error=InvalidCallback', request.url), 303);
    }

    // Verify the actual status with PhonePe (don't trust URL params alone)
    const statusResponse = await checkPaymentStatus(orderId);
    const paymentState = statusResponse?.state || statusResponse?.data?.state || state;

    if (paymentState === 'COMPLETED') {
      // Update transaction in DB
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'SUCCESS',
          phonepe_transaction_id: statusResponse?.transactionId || orderId,
          updated_at: new Date().toISOString()
        })
        .eq('merchant_transaction_id', orderId);

      // Activate the subscription
      const { data: transaction } = await supabaseAdmin
        .from('transactions')
        .select('agency_id, amount, plan_name')
        .eq('merchant_transaction_id', orderId)
        .single();

      if (transaction?.agency_id) {
        const amount = transaction.amount;
        // Determine plan duration and type from amount
        let planType = 'starter';
        let durationDays = 30;

        if (amount >= 1499) {
          planType = 'professional';
          durationDays = 30;
        }
        if (amount >= 7194) {
          // 6-month professional
          durationDays = 180;
        }
        if (amount >= 2394) {
          // 6-month starter
          durationDays = 180;
        }

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + durationDays);

        await supabaseAdmin
          .from('agencies')
          .update({
            plan_type: planType,
            subscription_status: 'active',
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: endDate.toISOString()
          })
          .eq('id', transaction.agency_id);
      }

      return NextResponse.redirect(
        new URL(`/payment-success?orderId=${orderId}`, request.url),
        303
      );
    } else {
      // Mark failed
      await supabaseAdmin
        .from('transactions')
        .update({ status: 'FAILED', updated_at: new Date().toISOString() })
        .eq('merchant_transaction_id', orderId);

      return NextResponse.redirect(
        new URL('/payment-failed', request.url),
        303
      );
    }
  } catch (error) {
    console.error('[Callback] Error:', error);
    return NextResponse.redirect(new URL('/pricing?error=ServerError', request.url), 303);
  }
}

// Also handle POST (some PhonePe flows POST the callback)
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const redirectUrl = orderId
    ? `/api/billing/callback?orderId=${orderId}`
    : '/pricing?error=InvalidCallback';
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}
