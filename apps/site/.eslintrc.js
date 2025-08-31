/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@promptrepo/config/eslint-next"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
