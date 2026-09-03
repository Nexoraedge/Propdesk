import { NextResponse } from 'next/server';
import { initiatePayment } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const agencyId = formData.get('agencyId') as string;
    const planName = formData.get('planName') as string;

    if (!agencyId) {
      return NextResponse.redirect(new URL('/pricing?error=MissingAgency', request.url), 303);
    }

    // Parse amount (in Rupees)
    const amount = formData.get('amount') ? parseInt(formData.get('amount') as string, 10) : 499;

    // Generate unique merchant order ID
    const merchantOrderId = `PD-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Log pending transaction to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('transactions')
      .insert({
        agency_id: agencyId,
        merchant_transaction_id: merchantOrderId,
        amount: amount,
        plan_name: planName || 'Unknown',
        status: 'PENDING'
      });

    if (dbError) {
      console.error('[Checkout] Failed to log transaction:', dbError);
      // Don't block payment if DB logging fails — continue
    }

    // Build redirect URL for after payment
    const protocol = request.headers.get('x-forwarded-proto') || (process.env.NODE_ENV === 'development' ? 'http' : 'https');
    const host = request.headers.get('host') || 'thepropdesk.in';
    const baseUrl = `${protocol}://${host}`;

    // Initiate PhonePe v2 Payment
    const payment = await initiatePayment({
      merchantOrderId,
      amount,
      redirectUrl: `${baseUrl}/payment-success?orderId=${merchantOrderId}&agencyId=${agencyId}&plan=${encodeURIComponent(planName || '')}`,
      metaInfo: {
        udf1: agencyId,
        udf2: planName || '',
        udf3: String(amount)
      }
    });

    if (payment.success && payment.redirectUrl) {
      return NextResponse.redirect(payment.redirectUrl, 303);
    }

    return NextResponse.redirect(new URL('/pricing?error=PaymentInitiationFailed', request.url), 303);

  } catch (error) {
    console.error('[Checkout] Error:', error);
    return NextResponse.redirect(new URL('/pricing?error=ServerError', request.url), 303);
  }
}
