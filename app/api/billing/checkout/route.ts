import { NextResponse } from 'next/server';
import { initiatePayment } from '@/lib/services/phonepe';
import { supabaseAdmin } from '@/lib/services/supabase';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const agencyId = formData.get('agencyId') as string;

    if (!agencyId) {
      return NextResponse.redirect(new URL('/pricing?error=MissingAgency', request.url));
    }

    // 1. Generate unique transaction ID
    const merchantTransactionId = `T${Date.now()}${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // 2. Log pending transaction to database
    const amount = 2499; // ₹2499 per month
    
    const { error: dbError } = await supabaseAdmin
      .from('transactions')
      .insert({
        agency_id: agencyId,
        merchant_transaction_id: merchantTransactionId,
        amount: amount,
        status: 'PENDING'
      });

    if (dbError) {
      console.error('Failed to log transaction:', dbError);
      return NextResponse.redirect(new URL('/pricing?error=DatabaseError', request.url));
    }

    // 3. Construct base URL for callbacks/redirects
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = request.headers.get('host') || 'thepropdesk.in';
    const baseUrl = `${protocol}://${host}`;

    // 4. Initiate PhonePe Payment
    const payment = await initiatePayment({
      merchantTransactionId,
      merchantUserId: agencyId, 
      amount: amount,
      redirectUrl: `${baseUrl}/api/billing/callback`, 
      redirectMode: 'POST',
      callbackUrl: `${baseUrl}/api/billing/webhook`,
    });

    if (payment.success && payment.redirectUrl) {
      return NextResponse.redirect(payment.redirectUrl, 303);
    }

    return NextResponse.redirect(new URL('/pricing?error=PaymentInitiationFailed', request.url));

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.redirect(new URL('/pricing?error=ServerError', request.url));
  }
}
