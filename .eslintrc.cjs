module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],
  'overrides': [],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 1,
    'react/no-unused-prop-types': 0,
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/display-name': 'off',
    'import/no-named-as-default': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'angular',
            group: 'external',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  'settings': {
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
    'import/resolver': {
      typescript: {},
    },
  },
};
