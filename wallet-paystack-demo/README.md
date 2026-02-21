# Wallet Paystack Demo

A lightweight React demo app that imitates a Paystack-style wallet interface. Built using Vite + React and using `localStorage` for simple persistence. This repository contains the UI, a simple auth context, transaction handling, charts, and onboarding steps (signup → KYC → BVN).

## Current Status

- Core pages implemented: Dashboard, Transactions, Analytics, Settings, Profile, Signup, Login
- Auth context/provider implemented and fixed (no circular imports)
- Profile image upload (saved as base64) with a "Save Image" action; image shown in Navbar
- Responsive layout with a sidebar and a mobile burger menu
- Charts using Chart.js (`react-chartjs-2`) for transaction visualizations
- Footer added and fixed to bottom

This README reflects recent fixes and UX improvements applied while debugging a blank-screen issue.

## Local setup

Prerequisites:

- Node.js (>=16 recommended)
- npm

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open the app at the address printed by the dev server (default: `http://localhost:5173`).

## Important Files

- `src/main.jsx` — app entry. Wraps the app in `AuthProvider`.
- `src/App.jsx` — routes and layout (sidebar + navbar + right-panel)
- `src/components/AuthProvider.jsx` — AuthContext and provider (login, logout)
- `src/components/Navbar.jsx` — top navigation (now uses React Router `Link` and includes a responsive burger)
- `src/components/Sidebar.jsx` — left navigation
- `src/components/Dashboard.jsx` — main dashboard UI
- `src/components/Transactions.jsx` — transactions page (form + list)
- `src/components/TransactionForm.jsx` / `TransactionList.jsx` — transaction helpers
- `src/components/TransactionChart.jsx` / `TransactionBarChart.jsx` / `src/components/Analytics.jsx` — charts (Chart.js)
- `src/components/Profile.jsx` — profile page with image upload and save
- `src/components/Settings.jsx` — settings (theme toggle, currency, clear/reset)
- `src/components/Footer.jsx` — footer component
- `src/paystack.css` — main styles and responsive behavior

## Notes on recent fixes / behavior

These changes were made to resolve runtime errors and improve UX while debugging a blank page issue:

- AuthProvider
  - `AuthContext` now exported from `src/components/AuthProvider.jsx` to avoid circular/self-imports.
  - `login()` accepts either a user object (used by `Signup`) or username/password and will persist the user into `localStorage`.
  - `logout()` clears both context state and `localStorage`.

- Routing & Navbar
  - Navigation uses `react-router-dom`'s `<Link>` components so navigation is client-side (no full reloads).
  - `signup` link hides when a user is present (logged in).
  - A responsive burger button toggles the left `sidebar` on small screens. The burger is hidden on desktop.

- Profile image
  - Upload a profile image on the Profile page. It previews locally as base64 and is saved to `localStorage` when you click "Save Image".
  - The Navbar reads `user.profilePicture` from context/localStorage and displays it as the avatar.

- ProtectedRoute (development mode)
  - For easier testing, the protected route currently checks only whether a user is logged in. In production you may want to re-enable KYC/BVN gating.

- CSS / Layout
  - Responsive tweaks were added: consistent `margin-top` under the navbar, spacing between dashboard cards on all device sizes, fixed footer with bottom padding on the content area, and theme toggle visuals.

## How to test common flows

- Sign up: Visit `/signup`, fill the form, click "Register" → will log you in and redirect to `/profile`.
- Login: Visit `/login` and supply your username/password (signup stores the user in `localStorage`).
- Profile image: Go to `/profile`, choose an image file, click "Save Image" → the avatar in the Navbar should update immediately.
- Dashboard access: If ProtectedRoute is blocking, ensure you have a logged-in user in `localStorage`. For quick testing you can run in the console:

```js
localStorage.setItem('user', JSON.stringify({ username: 'test', kycVerified: true, bvnVerified: true }));
```

Then refresh the app.

## Known issues & next steps

- ProtectedRoute currently accepts any logged-in user for convenience during development; re-enable KYC/BVN checks before production.
- Transaction types were unified to `income` / `expense` — ensure any persisted data uses these keys.
- Consider replacing base64 image storage with actual uploads (S3, other storage) for production.
- Add unit/integration tests and linting rules to prevent regressions.

## Contributing

If you'd like help implementing a feature or fixing a bug, open an issue or send me the details and I can implement or suggest a fix.

## License

This demo has no explicit license in the repo. Add one (e.g., MIT) if you plan to share or reuse the code.

---

If you'd like I can also:

- Add a short `CONTRIBUTING.md` with developer instructions
- Create scripts to seed `localStorage` for demo users
- Add a prettier/eslint config

Which would you like next?
