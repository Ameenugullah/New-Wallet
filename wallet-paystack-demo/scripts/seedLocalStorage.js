import { writeFileSync } from 'fs';
import { join } from 'path';

const user = {
  username: 'demo_user',
  fullName: 'Demo User',
  email: 'demo@example.com',
  kycVerified: true,
  bvnVerified: true,
  profilePicture: null
};

const transactions = [
  { id: 1, type: 'income', amount: 5000, description: 'Initial deposit', date: new Date().toISOString() },
  { id: 2, type: 'expense', amount: 1200, description: 'Groceries', date: new Date().toISOString() }
];

const snippet = `// Paste this into your app's browser console (on the app origin)
localStorage.setItem('user', JSON.stringify(${JSON.stringify(user)}));
localStorage.setItem('transactions', JSON.stringify(${JSON.stringify(transactions)}));
console.log('localStorage seeded: user and transactions');`;

// eslint-disable-next-line no-undef
const outPath = join(__dirname, 'seed-snippet.txt');
writeFileSync(outPath, snippet, 'utf8');

console.log('Wrote seed snippet to scripts/seed-snippet.txt');
console.log('To apply the seed: open your running app in the browser, open the developer console, paste the following and press Enter:\n');
console.log(snippet);
