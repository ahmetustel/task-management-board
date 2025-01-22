module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next',
    'next/core-web-vitals', // Next.js önerisi
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    // Kendi tercihine göre ek kurallar
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/prop-types': 'off',
  },
  ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
};
