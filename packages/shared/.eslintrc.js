/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@promptrepo/config/eslint-base"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
