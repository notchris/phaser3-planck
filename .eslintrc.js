module.exports = {
    root: true,
    env: {
      node: true,
      browser: true
    },
    'extends': [
      'eslint:recommended'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unused-vars': 'off'
    },
    parserOptions: {
      "ecmaVersion": '2018',
      "sourceType": "module",
      parser: 'babel-eslint',
      modules: true
    }
  }
  