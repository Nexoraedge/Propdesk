import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, companyName, affiliateCode } = body;

    if (!email || !companyName) {
      return NextResponse.json({ error: 'Email and Company Name are required' }, { status: 400 });
    }

    // 1. Create the Agency in Supabase with a 14-day free trial
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const { data: agency, error: agencyError } = await supabaseAdmin
      .from('agencies')
      .insert({
        name: companyName,
        plan_type: 'free',
        subscription_status: 'trial',
        subscription_end_date: trialEndsAt.toISOString(),
        referred_by: affiliateCode || null,
      })
      .select('id')
      .single();

    if (agencyError || !agency) {
      console.error('Failed to create agency:', agencyError);
      return NextResponse.json({ error: 'Failed to create your account' }, { status: 500 });
    }

    // 2. Send Supabase Magic Link / Invite Email
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        agency_id: agency.id,
        role: 'admin',
        full_name: 'Agency Admin'
      },
      redirectTo: 'https://app.thepropdesk.in/accept-invite'
    });

    if (inviteError) {
      console.error('Failed to send invite:', inviteError);
      return NextResponse.json({ error: 'Failed to send invitation email' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Account created! Please check your email to complete setup.' 
    });

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
