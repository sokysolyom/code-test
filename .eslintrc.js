module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',  // Ensures the resolver points to your tsconfig.json
          },
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:sonarjs/recommended-legacy',
        'plugin:security/recommended-legacy',
        'plugin:unicorn/recommended',
        'plugin:jsdoc/recommended',
        'prettier',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'summeet',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'summeet',
            style: 'kebab-case',
          },
        ],
        'import/order': [
          'error',
          {
            groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'never',
          },
        ],
        'import/no-default-export': ['error'],
        'import/no-extraneous-dependencies': ['error'],
        'import/no-unassigned-import': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-console': ['error'],
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'never',
            named: 'never',
          },
        ],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'no-eval': 'error',
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: false }],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: null,
          },
          {
            selector: 'variable',
            format: ['PascalCase', 'UPPER_CASE'],
            types: ['boolean'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
          },
          {
            selector: 'variableLike',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'property',
            modifiers: ['readonly'],
            format: ['PascalCase', 'camelCase'],
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true
            }
          }
        ],
        '@typescript-eslint/no-unsafe-enum-comparison': 'error',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        'security/detect-object-injection': 'error',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-null': 'off',
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
          },
        ],
        'jsdoc/require-jsdoc': [
          'error',
          {
            require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ClassDeclaration: true,
            },
          },
        ],
        'jsdoc/require-param': ['error', { checkRestProperty: false }],
        'jsdoc/require-param-type': 'error',
        'jsdoc/require-param-description': 'error',
        'jsdoc/require-returns': 'error',
        'jsdoc/require-returns-type': 'error',
        'jsdoc/require-returns-description': 'error',
        'jsdoc/require-throws': 'error',
        'jsdoc/check-tag-names': ['error', { definedTags: ['throws'] }],
        'jsdoc/check-alignment': 'error',
        'jsdoc/newline-after-description': 0,
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      rules: {
        '@angular-eslint/template/no-inline-styles': 'error',
      },
    },
  ],
};
