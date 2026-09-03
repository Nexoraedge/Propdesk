import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

// You should replace this with a verified domain (e.g. support@thepropdesk.in)
const DEFAULT_FROM_EMAIL = 'PropDesk <onboarding@resend.dev>'; 

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  if (!RESEND_API_KEY) {
    console.error("Resend API key missing. Email not sent.");
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend Error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Failed to send email:", err);
    return false;
  }
}

/**
 * Generates the HTML for an agency invitation email
 */
export function generateInvitationEmail(agencyName: string, inviteUrl: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <h2 style="color: #0f172a;">You've been invited!</h2>
      <p style="color: #475569; line-height: 1.6;">
        You have been invited to join <strong>${agencyName}</strong> on PropDesk.
      </p>
      <div style="margin: 30px 0;">
        <a href="${inviteUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Accept Invitation
        </a>
      </div>
      <p style="color: #64748b; font-size: 14px; margin-top: 40px; border-top: 1px solid #eaeaea; padding-top: 20px;">
        If you did not expect this invitation, you can safely ignore this email.
        <br>
        Powered by PropDesk
      </p>
    </div>
  `;
}
