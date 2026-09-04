import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

// You should replace this with a verified domain (e.g. support@thepropdesk.in)
const DEFAULT_FROM_EMAIL = 'PropDesk <hello@thepropdesk.in>';

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

/**
 * Generates the HTML for a payment receipt email
 */
export function generateReceiptEmail(agencyName: string, planName: string, seats: number, amount: number, date: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <h2 style="color: #0f172a;">Payment Successful</h2>
      <p style="color: #475569; line-height: 1.6;">
        Thank you for your purchase for <strong>${agencyName}</strong> on PropDesk. Your transaction was successful.
      </p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Plan:</strong> ${planName}</p>
        <p style="margin: 5px 0;"><strong>Seats:</strong> ${seats}</p>
        <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${amount}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
      </div>
      <p style="color: #475569; line-height: 1.6;">
        If you have any questions, feel free to reply to this email.
      </p>
      <p style="color: #64748b; font-size: 14px; margin-top: 40px; border-top: 1px solid #eaeaea; padding-top: 20px;">
        PropDesk - B-18, Surajpole Gate, Jaipur
      </p>
    </div>
  `;
}

/**
 * Generates the HTML for an admin notification of a new purchase
 */
export function generateAdminPurchaseNotification(agencyName: string, planName: string, seats: number, amount: number) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #10b981; border-radius: 10px; background-color: #ecfdf5;">
      <h2 style="color: #065f46;">🚀 New Sale Alert!</h2>
      <p style="color: #047857; line-height: 1.6;">
        A new payment has been successfully completed on PropDesk!
      </p>
      <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #a7f3d0;">
        <p style="margin: 5px 0; color: #064e3b;"><strong>Agency:</strong> ${agencyName}</p>
        <p style="margin: 5px 0; color: #064e3b;"><strong>Plan:</strong> ${planName}</p>
        <p style="margin: 5px 0; color: #064e3b;"><strong>Seats:</strong> ${seats}</p>
        <p style="margin: 5px 0; color: #064e3b;"><strong>Amount:</strong> ₹${amount}</p>
      </div>
      <p style="color: #047857; font-size: 14px; font-weight: bold;">Keep up the great work! 🎉</p>
    </div>
  `;
}
