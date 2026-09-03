import { NextResponse } from 'next/server';
import { checkPaymentStatus } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const transactionId = formData.get('transactionId') as string;
    
    if (!transactionId) {
      return NextResponse.redirect(new URL('/?error=InvalidCallback', request.url));
    }

    const statusResponse = await checkPaymentStatus(transactionId);
    
    if (!statusResponse || !statusResponse.success) {
      console.error('Callback status verification failed:', statusResponse);
      return NextResponse.redirect(new URL('/?error=PaymentVerificationFailed', request.url));
    }

    const paymentState = statusResponse.data.state; 
    
    if (paymentState === 'COMPLETED') {
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'SUCCESS',
          phonepe_transaction_id: statusResponse.data.transactionId,
          payment_method: statusResponse.data.paymentInstrument?.type || 'UNKNOWN',
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

      return NextResponse.redirect(new URL('/payment-success', request.url));
    } else {
      await supabaseAdmin
        .from('transactions')
        .update({
          status: 'FAILED',
          error_code: statusResponse.data.responseCode,
          updated_at: new Date().toISOString()
        })
        .eq('merchant_transaction_id', transactionId);

      return NextResponse.redirect(new URL('/pricing?error=PaymentFailed', request.url));
    }

  } catch (error) {
    console.error('Callback Error:', error);
    return NextResponse.redirect(new URL('/?error=ServerError', request.url));
  }
}
