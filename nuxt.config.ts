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
    privateRuntimeConfig: {
        ENVIRONMENT: process.env.NODE_ENV || 'development',
        SESSION_SECRET: process.env.SESSION_SECRET,
        PG_USER: process.env.PG_USER,
        PG_PASSWORD: process.env.PG_PASSWORD,
        PG_HOST: process.env.PG_HOST,
        PG_DATABASE: process.env.PG_DATABASE,
        EMAIL_DEBUG: process.env.EMAIL_DEBUG || false,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS,
    },
});
