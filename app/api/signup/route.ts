import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';
import { sendEmail, generateInvitationEmail } from '@/lib/services/email';

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

    // 2. Generate secure token without sending Supabase email
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'invite',
      email: email,
      options: {
        data: {
          agency_id: agency.id,
          role: 'admin',
          full_name: 'Agency Admin'
        },
        redirectTo: 'https://app.thepropdesk.in/accept-invite'
      }
    });

    if (inviteError) {
      console.error('Failed to generate invite:', inviteError);
      return NextResponse.json({ error: 'Failed to send invitation email' }, { status: 500 });
    }

    // 3. Construct custom link and send via Resend
    const hashedToken = inviteData?.properties?.hashed_token;
    const inviteUrl = `https://app.thepropdesk.in/accept-invite?token_hash=${hashedToken}&type=invite`;
    
    if (hashedToken) {
      await sendEmail({
        to: email,
        subject: `You have been invited to PropDesk`,
        html: generateInvitationEmail(companyName, inviteUrl)
      });
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
