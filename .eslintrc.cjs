module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Añadir esta línea para habilitar el entorno de Node.js
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-one-expression-per-line': 0,
  },
};
