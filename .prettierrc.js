
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
      {
          files: '.prettierrc',
          options: {
              parser: 'json',
          },
      },
      {
          files: 'document.ejs',
          options: {
              parser: 'html',
          },
      },
  ],
  plugins: [
    // './node_modules/prettier-plugin-organize-imports',
    // './node_modules/prettier-plugin-two-style-order',
  ],
  singleQuote: true,
  jsxSingleQuote: true,
  singleAttributePerLine: true, //2.6新增配置
};
