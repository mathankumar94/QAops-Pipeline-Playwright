const playwright = require('eslint-plugin-playwright');

module.exports = [
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      playwright,
    },
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      // Code quality
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],

      // Playwright specific
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': 'error',
    },
  },
];
