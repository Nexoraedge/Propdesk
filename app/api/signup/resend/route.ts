import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';
import { sendEmail, generateInvitationEmail } from '@/lib/services/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Since we don't have the agency_id directly, we can just resend the magic link
    // However, inviteUserByEmail might fail if the user already exists.
    // Let's use standard magic link auth for resend, or find the user first.
    
    // In Supabase, if a user is already invited but hasn't accepted, 
    // re-inviting or sending a magic link will work.
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'invite',
      email: email,
      options: {
        redirectTo: 'https://app.thepropdesk.in/accept-invite'
      }
    });

    if (inviteError) {
      console.error('Failed to resend invite:', inviteError);
      return NextResponse.json({ error: 'Failed to resend invitation email. Please contact support.' }, { status: 500 });
    }
    
    const hashedToken = inviteData?.properties?.hashed_token;
    const inviteUrl = `https://app.thepropdesk.in/accept-invite?token_hash=${hashedToken}&type=invite`;
    
    if (hashedToken) {
      await sendEmail({
        to: email,
        subject: `Your PropDesk Invitation`,
        html: generateInvitationEmail("PropDesk", inviteUrl)
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Invitation resent successfully.' 
    });

  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
