/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "./eslint-base.js",
    "next/core-web-vitals",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unescaped-entities": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-key": "error",
  },
  env: {
    browser: true,
    node: true,
  },
};
