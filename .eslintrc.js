module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-closing-bracket-newline': 0
  }
}
