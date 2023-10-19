import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel(['resources/js/app.jsx']),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            '~choicesjs': path.resolve(__dirname, 'node_modules/choices.js'),
            '~dropzone': path.resolve(__dirname, 'node_modules/dropzone'),
        }
    },
});
