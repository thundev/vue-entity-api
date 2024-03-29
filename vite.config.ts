import { resolve } from 'path';

export default {
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VueApi',
            fileName: 'index',
        },
    },
};
