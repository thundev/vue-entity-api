module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier', // Добавляем eslint-config-prettier
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                singleQuote: true,
                printWidth: 120,
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        'indent': ["error", 4, {"SwitchCase": 1}],
    },
    env: {
        node: true,
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
    globals: {
        NodeJS: true,
    },
};
