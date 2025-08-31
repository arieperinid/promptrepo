/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["../../packages/config/eslint-node.js"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
