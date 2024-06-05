/* eslint-disable no-undef */

module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
  },
  ignorePatterns: ["dist"],
};
