module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react-refresh', 'prettier', 'promise', 'import'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
