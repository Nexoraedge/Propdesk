import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code')?.toUpperCase();

    if (!code) {
      return NextResponse.json({ valid: false, error: 'Missing code' }, { status: 400 });
    }

    const { data: coupon, error } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return NextResponse.json({ valid: false, error: 'Invalid or expired coupon' });
    }

    // Check expiry
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, error: 'Coupon expired' });
    }

    // Check usage limits
    if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
      return NextResponse.json({ valid: false, error: 'Coupon usage limit reached' });
    }

    return NextResponse.json({ 
      valid: true,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value
    });

  } catch (error) {
    console.error('[Validate Coupon API]', error);
    return NextResponse.json({ valid: false, error: 'Internal Error' }, { status: 500 });
  }
}
