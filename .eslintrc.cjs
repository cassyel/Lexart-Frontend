module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', 'import', 'jsx-a11y', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'max-len': ['error', { code: 80, tabWidth: 2, ignorePattern: 'className=' }],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
