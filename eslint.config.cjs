const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["node_modules", "dist", "coverage"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "off",
      "no-unused-vars": ["warn"],
      "consistent-return": "off",
      "quotes": ["error", "single"],
      "semi": ["error", "always"]
    },
  },
];
