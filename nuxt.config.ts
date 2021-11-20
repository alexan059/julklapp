import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        ['nuxt-storm', { nested: true, alias: true }], // fix webstorm doesn't recognize auto-import components
    ],
    typescript: {
        strict: true,
    },
    css: [
        '@/assets/css/main.scss',
    ],
});
