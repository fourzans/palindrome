const js = require('@eslint/js');
const parserTs = require('@typescript-eslint/parser');
const pluginTs = require('@typescript-eslint/eslint-plugin');
const pluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  {
    ignores: [
      'dist',
      'node_modules',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': pluginTs,
       prettier: pluginPrettier
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': 'error'
    }
  }
];