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
    "@typescript-eslint/no-non-null-assertion":["off"],
    "func-names":["off"],
    "class-methods-use-this":["off"],
    "@typescript-eslint/no-inferrable-types":["off"],


    "prefer-destructing":["off"],
    "no-useless-return":["off"],
    "no-useless-constructor":["off"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"]
      }
    }
  }
};
