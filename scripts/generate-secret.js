// Run this script to generate a secure NEXTAUTH_SECRET
// Usage: node scripts/generate-secret.js

const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('base64');
console.log('\nGenerated NEXTAUTH_SECRET:');
console.log(secret);
console.log('\nAdd this to your .env.local file:');
console.log(`NEXTAUTH_SECRET=${secret}`);
console.log();