module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'react-native',
  ],
  ecmaFeatures: {
    jsx: true,
    classes: true,
  },
  env: {
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-console': 0,
    'arrow-body-style': ['error', 'always'],
  },
};
