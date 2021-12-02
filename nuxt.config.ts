import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        ['nuxt-storm', { nested: true, alias: true }], // fix webstorm doesn't recognize auto-import components
    ],
    typescript: {
        strict: true,
    },
    meta: {
        link: [
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'manifest', href: '/site.webmanifest' },
        ],
    },
    css: [
        '@/assets/css/main.scss',
    ],
    serverMiddleware: [
        { path: '/logout', handle: '~/server/routes/logout' },
        { path: '/login', handle: '~/server/routes/login' },
        { path: '/i', handle: '~/server/routes/invitation' },
    ],
});
