module.exports = {
    apps: [
        {
            name: 'julklapp',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};