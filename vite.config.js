import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'vue-beautiful-chat',
            formats: ['es'],
            fileName: (format) => `vue-beautiful-chat.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    optimizeDeps: {
        include: ['vue'],
    },
    plugins: [vue()],
    css: {
        extract: false, // 使用process.env.NODE_ENV来判断生产环境
    },
})
