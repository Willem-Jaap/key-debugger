import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts', '*.config.{js,mjs}']),
    ...nextCoreWebVitals,
    ...nextTypescript,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strict,
    prettierRecommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'prettier/prettier': ['error', { endOfLine: 'auto', quoteProps: 'consistent' }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-misused-promises': [
                'error',
                { checksVoidReturn: { attributes: false } },
            ],
            'react/hook-use-state': 'warn',
            'react/self-closing-comp': ['warn', { component: true, html: true }],
            'react/function-component-definition': [
                'error',
                { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
            ],
            'react/react-in-jsx-scope': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['./*'],
                            message:
                                'Please use absolute imports instead. Take a look at the paths in tsconfig.json for available options.',
                        },
                    ],
                },
            ],
        },
    },
]);
