/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["../config/eslint-base.js"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
