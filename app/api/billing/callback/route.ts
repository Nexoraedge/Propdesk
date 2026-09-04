import { NextResponse } from 'next/server';
import { checkPaymentStatus } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';
import { sendEmail, generateReceiptEmail, generateAdminPurchaseNotification } from '@/lib/services/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId') || searchParams.get('transactionId');
    const state = searchParams.get('state');

    if (!orderId) {
      return NextResponse.redirect(new URL('/pricing?error=InvalidCallback', request.url), 303);
    }

    // Verify the actual status with PhonePe
    const statusResponse = await checkPaymentStatus(orderId);
    const paymentState = statusResponse?.state || statusResponse?.data?.state || state;

    if (paymentState === 'COMPLETED') {
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'SUCCESS',
          phonepe_transaction_id: statusResponse?.transactionId || orderId,
          updated_at: new Date().toISOString()
        })
        .eq('merchant_transaction_id', orderId);

      const { data: transaction } = await supabaseAdmin
        .from('transactions')
        .select('agency_id, plan_name, amount')
        .eq('merchant_transaction_id', orderId)
        .single();

      if (transaction?.agency_id) {
        // Parse plan_name e.g. "monthly_5seats" or "6months_2seats"
        const planParts = transaction.plan_name.split('_');
        const cycle = planParts[0];
        const seats = parseInt(planParts[1].replace('seats', ''), 10) || 1;
        const durationDays = cycle === '6months' ? 180 : 30;

        // Note: For actual PRORATION, we should look at existing expiry.
        // If it's a pure upgrade (proration applied), the expiry doesn't change!
        // But if they are RENEWING (buying time), it extends.
        // For simplicity in this demo, we just extend by durationDays from NOW if it's expired,
        // or add durationDays to the existing expiry if active.
        
        const { data: agency } = await supabaseAdmin.from('agencies').select('subscription_status, subscription_end_date, max_users').eq('id', transaction.agency_id).single();
        
        let newEndDate = new Date();
        
        if (agency?.subscription_status === 'active' && agency.subscription_end_date) {
            const currentEndDate = new Date(agency.subscription_end_date);
            if (currentEndDate > new Date()) {
                if (seats > (agency.max_users || 0)) {
                    // This was a PRORATED mid-cycle upgrade! 
                    // Expiry date stays EXACTLY THE SAME.
                    newEndDate = currentEndDate;
                } else {
                    // They are renewing ahead of time
                    newEndDate = new Date(currentEndDate.getTime() + (durationDays * 24 * 60 * 60 * 1000));
                }
            } else {
                newEndDate.setDate(newEndDate.getDate() + durationDays);
            }
        } else {
            newEndDate.setDate(newEndDate.getDate() + durationDays);
        }

        await supabaseAdmin
          .from('agencies')
          .update({
            plan_type: 'professional',
            subscription_status: 'active',
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: newEndDate.toISOString(),
            max_users: seats
          })
                    .eq('id', transaction.agency_id);
          
        // Send Emails
        try {
          const { data: updatedAgency } = await supabaseAdmin.from('agencies').select('name').eq('id', transaction.agency_id).single();
          const agencyName = updatedAgency?.name || 'Your Agency';
          const amount = transaction.amount || 0;
          const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
          const planDisplay = cycle === '6months' ? '6 Months Plan' : 'Monthly Plan';

          // Fetch all admins for this agency to send receipts
          const { data: admins } = await supabaseAdmin
            .from('profiles')
            .select('email')
            .eq('agency_id', transaction.agency_id)
            .eq('role', 'admin');

          if (admins && admins.length > 0) {
            const adminEmails = admins.map(a => a.email).filter(Boolean) as string[];
            if (adminEmails.length > 0) {
              await sendEmail({
                to: adminEmails,
                subject: `Payment Receipt for ${agencyName}`,
                html: generateReceiptEmail(agencyName, planDisplay, seats, amount, dateStr)
              });
            }
          }

          // Send admin notification to deskprop1@gmail.com
          await sendEmail({
            to: 'deskprop1@gmail.com',
            subject: `🎉 New Sale - ${agencyName}`,
            html: generateAdminPurchaseNotification(agencyName, planDisplay, seats, amount)
          });
        } catch (emailErr) {
          console.error("Failed to send billing emails:", emailErr);
        }
      }

      return NextResponse.redirect(
        new URL(`/payment-success?orderId=${orderId}`, request.url),
        303
      );
    } else {
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

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const redirectUrl = orderId
    ? `/api/billing/callback?orderId=${orderId}`
    : '/pricing?error=InvalidCallback';
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}
