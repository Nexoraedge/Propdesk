const fs = require('fs');
const file = '/Users/divitjain/Downloads/propdesk/app/api/billing/checkout/route.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "redirectUrl: `${baseUrl}/payment-success?orderId=${merchantOrderId}&agencyId=${agencyId}&plan=${encodeURIComponent(planName || '')}`",
  "redirectUrl: `${baseUrl}/api/billing/callback?orderId=${merchantOrderId}`"
);

fs.writeFileSync(file, code);
console.log('patched checkout');
