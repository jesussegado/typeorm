module.exports = {
  env: {
    node: true,
    mocha: true
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-floating-promises": ["error"],
    "no-use-before-define": ["error", "nofunc"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

    "import/extensions": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "import/prefer-default-export":["off"],
    "eslint@typescript-eslint/no-non-null-assertion":["off"],
    "func-names":["off"],

  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"]
      }
    }
  }
};
