module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/eslint-recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react/recommended',
//     'plugin:prettier/recommended',
//     'prettier/@typescript-eslint',
//   ],
//   env: {
//     browser: true,
//     es6: true,
//     node: true,
//   },
//   overrides: [
//     {
//       files: ['*.tsx'],
//       rules: {
//         'react/prop-types': 'off',
//       },
//     },
//     {
//       files: ['*.js'],
//       rules: {
//         '@typescript-eslint/no-var-requires': 'off',
//       },
//     },
//   ],
// };
