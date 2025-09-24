import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import useImageComponent from './eslint-rules/use-image-component.js';
import fixEmptySelectItemValue from './eslint-rules/fix-empty-select-item-value.js';

export default [
  {
    ignores: ['node_modules', 'dist', 'public'],
  },
  {
    plugins: {
      react: reactPlugin,
      import: importPlugin,
      custom: {
        rules: {
          'use-image-component': useImageComponent,
          'fix-empty-select-item-value': fixEmptySelectItemValue,
        },
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        JSX: 'readonly',
        cn: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'custom/use-image-component': 'error',
      'custom/fix-empty-select-item-value': 'error',
      'no-unused-vars': 'off',
      'no-unused-labels': 'off',
      'no-unused-expressions': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': 'off',
      'import/named': 'error',
      'import/default': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'JSXElement[openingElement.name.name="Route"] JSXText[value="Wix Vibe"]',
          message:
            'Routes are not implemented. The default "Wix Vibe" route is still present, which means pages are probably not visible to the user. Please implement proper routes for your application.',
        },
      ],
    },
  },
];
