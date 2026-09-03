const fs = require('fs');
const file = '/Users/divitjain/Downloads/propdesk/app/api/billing/callback/route.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "new URL('/pricing?error=PaymentFailed', request.url)",
  "new URL('/payment-failed', request.url)"
);

fs.writeFileSync(file, code);
console.log('patched');
