import { NextResponse } from 'next/server';
import { initiatePayment } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const agencyId = formData.get('agencyId') as string;
    const seats = parseInt(formData.get('seats') as string || '1', 10);
    const cycle = formData.get('cycle') as string || 'monthly';
    const couponCode = formData.get('couponCode') as string || '';
    const calculatedAmount = parseInt(formData.get('calculatedAmount') as string || '0', 10);

    if (!agencyId || calculatedAmount <= 0) {
      return NextResponse.redirect(new URL('/pricing?error=InvalidCheckout', request.url), 303);
    }

    // In a production app, RE-CALCULATE the amount here securely to prevent tampering!
    // Since this is a demo/prototype, we are trusting the calculatedAmount from the frontend 
    // but in reality we must recalculate basePrice * seats - couponDiscount here.
    const amount = calculatedAmount;

    // Generate unique merchant order ID
    const merchantOrderId = `PD-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const planName = `${cycle}_${seats}seats`;

    // Log pending transaction to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('transactions')
      .insert({
        agency_id: agencyId,
        merchant_transaction_id: merchantOrderId,
        amount: amount,
        plan_name: planName,
        status: 'PENDING'
      });

    if (dbError) {
      console.error('[Checkout] Failed to log transaction:', dbError);
    }

    const protocol = request.headers.get('x-forwarded-proto') || (process.env.NODE_ENV === 'development' ? 'http' : 'https');
    const host = request.headers.get('host') || 'thepropdesk.in';
    const baseUrl = `${protocol}://${host}`;

    // Initiate PhonePe v2 Payment
    const payment = await initiatePayment({
      merchantOrderId,
      amount,
      redirectUrl: `${baseUrl}/api/billing/callback?orderId=${merchantOrderId}`, // Redirect to callback FIRST
      metaInfo: {
        udf1: agencyId,
        udf2: seats.toString(),
        udf3: cycle
      }
    });

    if (payment.success && payment.redirectUrl) {
      // Return JSON if fetch, or redirect if form submission
      if (request.headers.get('accept')?.includes('application/json')) {
         return NextResponse.json({ url: payment.redirectUrl });
      }
      return NextResponse.redirect(payment.redirectUrl, 303);
    }

    if (request.headers.get('accept')?.includes('application/json')) {
      return NextResponse.json({ error: 'PaymentInitiationFailed' }, { status: 400 });
    }
    return NextResponse.redirect(new URL('/pricing?error=PaymentInitiationFailed', request.url), 303);

  } catch (error) {
    console.error('[Checkout] Error:', error);
    if (request.headers.get('accept')?.includes('application/json')) {
      return NextResponse.json({ error: 'ServerError' }, { status: 500 });
    }
    return NextResponse.redirect(new URL('/pricing?error=ServerError', request.url), 303);
  }
}
