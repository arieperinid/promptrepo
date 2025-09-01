/** @type {import("lint-staged").Config} */
module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
  ],
  "*.{json,css,scss,md}": [
    "prettier --write",
  ],
  // Run typecheck on any TypeScript file change
  "*.{ts,tsx}": [
    () => "pnpm -w typecheck",
  ],
};
