import { NextResponse } from 'next/server';
import { checkPaymentStatus } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const orderId = data.merchantOrderId || data.orderId;
    const state = data.state;

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    if (state === 'COMPLETED') {
      const statusResponse = await checkPaymentStatus(orderId);
      const confirmedState = statusResponse?.state || state;

      if (confirmedState !== 'COMPLETED') {
        return NextResponse.json({ received: true });
      }

      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'SUCCESS',
          phonepe_transaction_id: data.transactionId || orderId,
          payment_method: data.paymentMethod || 'UNKNOWN',
          updated_at: new Date().toISOString()
        })
        .eq('merchant_transaction_id', orderId);

      const { data: transaction } = await supabaseAdmin
        .from('transactions')
        .select('agency_id, plan_name')
        .eq('merchant_transaction_id', orderId)
        .single();

      if (transaction?.agency_id) {
        const planParts = transaction.plan_name.split('_');
        const cycle = planParts[0];
        const seats = parseInt(planParts[1].replace('seats', ''), 10) || 1;
        const durationDays = cycle === '6months' ? 180 : 30;

        const { data: agency } = await supabaseAdmin.from('agencies').select('subscription_status, subscription_end_date, max_users').eq('id', transaction.agency_id).single();
        
        let newEndDate = new Date();
        
        if (agency?.subscription_status === 'active' && agency.subscription_end_date) {
            const currentEndDate = new Date(agency.subscription_end_date);
            if (currentEndDate > new Date()) {
                if (seats > (agency.max_users || 0)) {
                    // Proration!
                    newEndDate = currentEndDate;
                } else {
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
