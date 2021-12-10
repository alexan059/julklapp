module.exports = {
    apps: [
        {
            name: 'JulklAPP',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
};