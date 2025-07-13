import baseConfig from '../../../eslint.base.config.mjs';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {},
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];