import { NextResponse } from 'next/server';
import { verifyCallback } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const xVerify = request.headers.get('x-verify') || '';

    if (!body.response || !verifyCallback(body.response, xVerify)) {
      console.error('Webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid Signature' }, { status: 400 });
    }

    const decodedPayload = Buffer.from(body.response, 'base64').toString('utf-8');
    const payload = JSON.parse(decodedPayload);

    const transactionId = payload.data.merchantTransactionId;
    const paymentState = payload.data.state;

    if (paymentState === 'COMPLETED') {
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'SUCCESS',
          phonepe_transaction_id: payload.data.transactionId,
          payment_method: payload.data.paymentInstrument?.type || 'UNKNOWN',
          updated_at: new Date().toISOString()
        })
        .eq('merchant_transaction_id', transactionId);

      const { data: transaction } = await supabaseAdmin
        .from('transactions')
        .select('agency_id')
        .eq('merchant_transaction_id', transactionId)
        .single();
        
      if (transaction?.agency_id) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        
        await supabaseAdmin
          .from('agencies')
          .update({
            plan_type: 'monthly',
            subscription_status: 'active',
            subscription_start_date: new Date().toISOString(),
            subscription_end_date: endDate.toISOString()
          })
          .eq('id', transaction.agency_id);
      }
    } else if (paymentState === 'FAILED') {
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'FAILED',
          error_code: payload.data.responseCode,
          updated_at: new Date().toISOString()
        })
        .eq('merchant_transaction_id', transactionId);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
