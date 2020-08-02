module.exports = {
  env: {
    node: false,
    mocha: true,
    browser: true
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
    // "no-use-before-define": ["error", "nofunc"],
    // "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

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
    "radix":["off"],
    "@typescript-eslint/no-unused-vars":["off"],
    "@typescript-eslint/explicit-function-return-type":["off"],
    "no-unused-expressions":["off"],
    "no-return-assign":["off"],

    "no-param-reassign":["off"],
    "no-shadow":["off"],
    "no-dupe-class-members":["off"],
    "no-console":["off"], // TODO: add logger level error and enable this lint
    // "no-underscore-dangle": ["error", { "allow": ["__dirname", "__value__"] }],
    "no-underscore-dangle": ["off"],
    "consistent-return": ["off"],
    "@typescript-eslint/no-empty-function":"off",
    "no-restricted-syntax":"off",
    "no-prototype-builtins":"off",
    "global-require":"off",

    "@typescript-eslint/no-var-requires":"off",
    "@typescript-eslint/no-use-before-define":"off",
    "import/no-dynamic-require":"off",
    "import/no-extraneous-dependencies":"off",
    "import/no-unresolved":"off",
    "no-plusplus":"off",
    "no-use-before-define":"off",
},
overrides: [
    {
        "files": [ "test/**/*.ts" ],
        "rules": {
        "no-await-in-loop": ["off"],
        "@typescript-eslint/camelcase": "off"
      }
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"]
      }
    }
  }
};
