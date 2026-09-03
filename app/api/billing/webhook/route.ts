import { NextResponse } from 'next/server';
import { checkPaymentStatus } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';

/**
 * PhonePe v2 Server-to-Server Webhook
 * PhonePe POSTs to this endpoint when payment status changes.
 * Payload contains: orderId, transactionId, state, amount, etc.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const orderId = data.merchantOrderId || data.orderId;
    const state = data.state;

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    console.log(`[Webhook] Received | orderId=${orderId} | state=${state}`);

    if (state === 'COMPLETED') {
      // Double-verify with PhonePe status API
      const statusResponse = await checkPaymentStatus(orderId);
      const confirmedState = statusResponse?.state || state;

      if (confirmedState !== 'COMPLETED') {
        console.warn(`[Webhook] State mismatch | claimed=COMPLETED | actual=${confirmedState}`);
        return NextResponse.json({ received: true });
      }

      // Update transaction
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'SUCCESS',
          phonepe_transaction_id: data.transactionId || orderId,
          payment_method: data.paymentMethod || 'UNKNOWN',
          updated_at: new Date().toISOString()
        })
        .eq('merchant_transaction_id', orderId);

      // Get agency and activate subscription
      const { data: transaction } = await supabaseAdmin
        .from('transactions')
        .select('agency_id, amount, plan_name')
        .eq('merchant_transaction_id', orderId)
        .single();

      if (transaction?.agency_id) {
        const amount = transaction.amount;
        let planType = 'starter';
        let durationDays = 30;

        if (amount >= 1499) { planType = 'professional'; durationDays = 30; }
        if (amount >= 7194) { planType = 'professional'; durationDays = 180; }
        if (amount >= 2394) { planType = 'starter'; durationDays = 180; }

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

        console.log(`[Webhook] Subscription activated | agency=${transaction.agency_id} | plan=${planType} | days=${durationDays}`);
      }
    } else if (state === 'FAILED') {
      await supabaseAdmin
        .from('transactions')
        .update({ status: 'FAILED', updated_at: new Date().toISOString() })
        .eq('merchant_transaction_id', orderId);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[Webhook] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
