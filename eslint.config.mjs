import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["js/*.js"],
    languageOptions: { globals: globals.browser }
  },
  {
    rules: {
      eqeqeq: ["error"],
      curly: ["error"],
      "no-multiple-empty-lines": ["error", {"max": 2}],
      camelcase: ["error"]
    }
  },
  pluginJs.configs.recommended,
  {
    ignores: [
      'node_modules',
      'tailwind.config.js'
    ]
  }
];