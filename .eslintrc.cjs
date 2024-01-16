/* eslint-disable @typescript-eslint/indent */
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  rules: {
    "brace-style": ["error", "1tbs"],
    "no-trailing-spaces": "warn",
    "no-nested-ternary": "warn",
    "default-case": "error",
    "default-case-last": "warn",
    "no-console": "error",
    //"no-empty-functions": "warn",
    // "no-magic-numbers": ["warn", { "ignoreDefaultValues": true, "ignoreArrayIndexes": true }],
    camelcase: "warn",
    "no-var": "warn",
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "prefer-destructuring": "warn",
    "require-await": "warn",
    //"sort-imports": "warn",
    yoda: "warn",
    "arrow-spacing": "warn",
    "block-spacing": "warn",
    "comma-spacing": "warn",
    "computed-property-spacing": "warn",
    "func-call-spacing": "warn",
    "array-bracket-spacing": "warn",
    "space-infix-ops": "warn",
    "key-spacing": "warn",
    "keyword-spacing": "warn",
    "jsx-quotes": "warn",
    // "indent": ["warn", "tab"],
    "@typescript-eslint/indent": ["warn", "tab"],
    "no-multi-spaces": "warn",
    semi: "warn",
    eqeqeq: ["warn", "smart"],
    // "@typescript-eslint/explicit-function-return-type": ["warn"]
  },
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  overrides: [
    {
      files: [
        "**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}",
        "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      ],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  parser: "vue-eslint-parser",
};
