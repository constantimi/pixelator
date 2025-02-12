import eslintConfigNext from 'eslint-config-next';

export default [
    eslintConfigNext,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        rules: {
            'no-console': 'warn',
            'react/react-in-jsx-scope': 'off',
        },
    },
];
