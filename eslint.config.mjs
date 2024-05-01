import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  eslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['packages/*/tsconfig.json'],
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['*.js', '*.config.{js,ts,mjs,mts}'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['**/dist/', '**/.stryker-tmp/', '**/reports/'],
  },
];
