module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'comma-dangle': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 1,
    'no-undef': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'no-unused-vars': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'lines-between-class-members': 0
  }
};
