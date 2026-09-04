import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY || "re_dummy_key_for_build");

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
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #f1f5f9; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              
              <!-- Header Section -->
              <tr>
                <td style="padding: 40px 40px 20px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">PropDesk</h1>
                  <p style="margin: 8px 0 0 0; color: #10b981; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Exclusive Invitation</p>
                </td>
              </tr>

              <!-- Body Section -->
              <tr>
                <td style="padding: 10px 40px 30px 40px; text-align: center;">
                  <p style="margin: 0; color: #334155; font-size: 16px; line-height: 24px;">
                    You've been invited to join <strong>${agencyName}</strong>'s workspace on PropDesk. 
                  </p>
                  <p style="margin: 16px 0 0 0; color: #64748b; font-size: 15px; line-height: 24px;">
                    Collaborate, manage leads, and close deals faster using the ultimate property management system.
                  </p>
                </td>
              </tr>

              <!-- CTA Button -->
              <tr>
                <td align="center" style="padding: 0 40px 40px 40px;">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 8px;" bgcolor="#0f172a">
                        <a href="${inviteUrl}" target="_blank" style="font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; border: 1px solid #0f172a; display: inline-block;">
                          Accept Invitation
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer Section -->
              <tr>
                <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #f1f5f9; text-align: center;">
                  <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 18px;">
                    If you did not expect this invitation, you can safely ignore this email.
                    <br>
                    &copy; ${new Date().getFullYear()} PropDesk. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generates the HTML for a payment receipt email
 */
export function generateReceiptEmail(agencyName: string, planName: string, seats: number, amount: number, date: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #f1f5f9; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              
              <!-- Header Section -->
              <tr>
                <td style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 1px dashed #e2e8f0;">
                  <div style="width: 48px; height: 48px; background-color: #10b981; border-radius: 50%; display: inline-block; line-height: 48px; color: white; font-size: 24px; font-weight: bold; margin-bottom: 16px;">✓</div>
                  <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Payment Successful</h1>
                  <p style="margin: 8px 0 0 0; color: #64748b; font-size: 15px;">Thank you for your purchase for <strong>${agencyName}</strong>.</p>
                </td>
              </tr>

              <!-- Receipt Details -->
              <tr>
                <td style="padding: 30px 40px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <tr>
                      <td style="padding: 20px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                              <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Plan Details</p>
                              <p style="margin: 4px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 700;">${planName} Plan</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="color: #64748b; font-size: 14px;">Seats Activated</td>
                                  <td align="right" style="color: #0f172a; font-size: 14px; font-weight: 600;">${seats}</td>
                                </tr>
                                <tr>
                                  <td style="color: #64748b; font-size: 14px; padding-top: 8px;">Date</td>
                                  <td align="right" style="color: #0f172a; font-size: 14px; font-weight: 600; padding-top: 8px;">${date}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 12px;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="color: #0f172a; font-size: 16px; font-weight: 700;">Total Amount</td>
                                  <td align="right" style="color: #10b981; font-size: 20px; font-weight: 800;">₹${amount}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer Section -->
              <tr>
                <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #f1f5f9; text-align: center;">
                  <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 18px;">
                    If you have any questions, feel free to reply directly to this email.
                    <br><br>
                    <strong>PropDesk</strong> &middot; B-18, Surajpole Gate, Jaipur
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generates the HTML for an admin notification of a new purchase
 */
export function generateAdminPurchaseNotification(agencyName: string, planName: string, seats: number, amount: number) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);">
              
              <!-- Header Section -->
              <tr>
                <td style="padding: 40px 40px 20px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #f8fafc; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">🚀 New Sale Alert!</h1>
                  <p style="margin: 8px 0 0 0; color: #10b981; font-size: 15px; font-weight: 500;">Another agency has joined the revolution.</p>
                </td>
              </tr>

              <!-- Receipt Details -->
              <tr>
                <td style="padding: 10px 40px 40px 40px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 12px; border: 1px solid #334155;">
                    <tr>
                      <td style="padding: 24px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding-bottom: 16px; border-bottom: 1px solid #334155;">
                              <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Agency</p>
                              <p style="margin: 4px 0 0 0; color: #f8fafc; font-size: 18px; font-weight: 700;">${agencyName}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 16px 0; border-bottom: 1px solid #334155;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="color: #94a3b8; font-size: 14px;">Plan Selected</td>
                                  <td align="right" style="color: #f8fafc; font-size: 14px; font-weight: 600;">${planName}</td>
                                </tr>
                                <tr>
                                  <td style="color: #94a3b8; font-size: 14px; padding-top: 12px;">Total Seats</td>
                                  <td align="right" style="color: #f8fafc; font-size: 14px; font-weight: 600; padding-top: 12px;">${seats}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 16px;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="color: #f8fafc; font-size: 16px; font-weight: 700;">Revenue</td>
                                  <td align="right" style="color: #10b981; font-size: 24px; font-weight: 900;">₹${amount}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
