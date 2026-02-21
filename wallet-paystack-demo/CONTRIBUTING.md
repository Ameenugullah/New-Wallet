# Contributing

Thanks for wanting to contribute — this is a small demo project, and contributions that improve developer experience or fix bugs are welcome.

Please follow these simple guidelines:

- Run the app locally before making changes:

```bash
npm install
npm run dev
```

- Branches and commits
  - Create a branch named `feat/description` or `fix/description`.
  - Make focused commits with clear messages. Use present-tense verbs, for example `Fix signup avatar update`.

- Formatting & linting
  - The project does not currently enforce formatting in CI. Please keep files consistent with the existing style.
  - If you add tooling (Prettier/ESLint), include configuration and update `package.json` scripts.

- Testing your changes
  - This is a UI demo without automated tests. Manually verify flows (signup, login, profile image, transactions, charts) in the browser.

- Local data persistence
  - The app stores data in `localStorage` (user, transactions, settings). When testing, you may clear it via devtools or reuse `scripts/seedLocalStorage.js`.

- Submitting changes
  - Open a pull request describing the change and the steps to reproduce.
  - If your change affects the UI, include before/after screenshots or a short video/gif.

If you'd like, I can also add:

- An automated Prettier/ESLint config and a `format` script.
- A `seed` script to populate `localStorage` for demo testing (I can add this now).

Thanks — feel free to request a small PR to add any of these items.
