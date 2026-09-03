/**
 * PhonePe Payment Gateway Integration - V2 OAuth Flow
 * Uses Client Credentials OAuth to get a Bearer token, then hits the v2 checkout API.
 */

const CLIENT_ID = process.env.PHONEPE_MERCHANT_ID || '';
const CLIENT_SECRET = process.env.PHONEPE_SALT_KEY || '';
const CLIENT_VERSION = process.env.PHONEPE_SALT_INDEX || '1';
const ENV = (process.env.PHONEPE_ENV || 'PROD').trim();

const IS_PROD = ENV === 'PROD';

const TOKEN_URL = IS_PROD
  ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

const CHECKOUT_URL = IS_PROD
  ? 'https://api.phonepe.com/apis/pg/checkout/v2/pay'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';

const STATUS_URL_BASE = IS_PROD
  ? 'https://api.phonepe.com/apis/pg/checkout/v2/order'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order';

// In-memory token cache (cleared on server restart, but sufficient for Vercel serverless)
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Gets a valid OAuth bearer token, using cached one if still valid
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if it has >60 seconds left
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token;
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      client_version: CLIENT_VERSION,
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();

  if (!data.access_token) {
    console.error('[PhonePe] Token error:', data);
    throw new Error('Failed to get PhonePe access token');
  }

  cachedToken = {
    token: data.access_token,
    expiresAt: data.expires_at ? data.expires_at * 1000 : Date.now() + 3600000
  };

  console.log(`[PhonePe] New token obtained, expires at: ${new Date(cachedToken.expiresAt).toISOString()}`);
  return cachedToken.token;
}

export interface PaymentRequest {
  merchantOrderId: string;
  amount: number; // In Rupees (will be converted to paise)
  redirectUrl: string;
  metaInfo?: Record<string, string>;
}

/**
 * Initiates a PhonePe v2 payment checkout session
 */
export async function initiatePayment(payload: PaymentRequest) {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('PhonePe configuration missing from environment variables.');
  }

  const token = await getAccessToken();

  const requestBody = {
    merchantOrderId: payload.merchantOrderId,
    amount: Math.round(payload.amount * 100), // Rupees → paise
    expireAfter: 1200, // 20 minutes
    paymentFlow: {
      type: 'PG_CHECKOUT',
      message: 'PropDesk Subscription Payment',
      merchantUrls: {
        redirectUrl: payload.redirectUrl
      }
    },
    ...(payload.metaInfo ? { metaInfo: payload.metaInfo } : {})
  };

  console.log(`[PhonePe] Initiating payment | OrderId=${payload.merchantOrderId} | Amount=₹${payload.amount}`);

  const response = await fetch(CHECKOUT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `O-Bearer ${token}`
    },
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();

  if (!data.redirectUrl && data.state !== 'PENDING') {
    console.error('[PhonePe] Checkout error:', JSON.stringify(data));
    throw new Error(data.message || data.description || 'Payment initiation failed');
  }

  return {
    success: true,
    redirectUrl: data.redirectUrl,
    orderId: payload.merchantOrderId
  };
}

/**
 * Checks payment/order status by merchant order ID
 */
export async function checkPaymentStatus(merchantOrderId: string) {
  const token = await getAccessToken();

  const response = await fetch(`${STATUS_URL_BASE}/${merchantOrderId}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `O-Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;
}
