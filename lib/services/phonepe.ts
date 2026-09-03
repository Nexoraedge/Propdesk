import crypto from 'crypto';

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || '';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const ENV = process.env.PHONEPE_ENV || 'UAT';

// UAT URL: https://api-preprod.phonepe.com/apis/pg-sandbox
// PROD URL: https://api.phonepe.com/apis/hermes
const BASE_URL = ENV === 'PROD' 
  ? 'https://api.phonepe.com/apis/hermes' 
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

export interface PaymentRequest {
  merchantTransactionId: string;
  merchantUserId: string; // Agency ID
  amount: number; // In Rupees (will be converted to paise)
  redirectUrl: string;
  redirectMode: 'REDIRECT' | 'POST';
  callbackUrl: string;
  mobileNumber?: string;
}

/**
 * Initiates a payment session with PhonePe
 */
export async function initiatePayment(payload: PaymentRequest) {
  if (!MERCHANT_ID || !SALT_KEY) {
    throw new Error('PhonePe configuration missing from environment variables.');
  }

  const requestBody = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: payload.merchantTransactionId,
    merchantUserId: payload.merchantUserId,
    amount: Math.round(payload.amount * 100), // Convert to paise
    redirectUrl: payload.redirectUrl,
    redirectMode: payload.redirectMode,
    callbackUrl: payload.callbackUrl,
    mobileNumber: payload.mobileNumber,
    paymentInstrument: {
      type: 'PAY_PAGE'
    }
  };

  const base64Payload = Buffer.from(JSON.stringify(requestBody)).toString('base64');
  
  // X-VERIFY = SHA256(base64Payload + "/pg/v1/pay" + saltKey) + ### + saltIndex
  const endpoint = '/pg/v1/pay';
  const stringToHash = base64Payload + endpoint + SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const checksum = `${sha256}###${SALT_INDEX}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-VERIFY': checksum
    },
    body: JSON.stringify({ request: base64Payload })
  });

  const data = await response.json();

  if (!data.success) {
    console.error('PhonePe Error:', data);
    throw new Error(data.message || 'Payment initiation failed');
  }

  return {
    success: true,
    redirectUrl: data.data.instrumentResponse.redirectInfo.url,
    transactionId: payload.merchantTransactionId
  };
}

/**
 * Verifies the callback response from PhonePe
 */
export function verifyCallback(responseBase64: string, xVerifyHeader: string): boolean {
  if (!responseBase64 || !xVerifyHeader) return false;

  const stringToHash = responseBase64 + SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const expectedChecksum = `${sha256}###${SALT_INDEX}`;

  return xVerifyHeader === expectedChecksum;
}

/**
 * Checks payment status manually
 */
export async function checkPaymentStatus(merchantTransactionId: string) {
  const endpoint = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
  
  const stringToHash = endpoint + SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const checksum = `${sha256}###${SALT_INDEX}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': MERCHANT_ID
    }
  });

  const data = await response.json();
  return data;
}
