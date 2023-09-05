module.exports = {
  apps: [
    {
      name: 'nuxt-3-template',
      script: './.output/server/index.mjs',
      port: '8083',
      cwd: '/home/wcmc/nuxt-3-template/current/'
      // exec_mode: 'cluster', might be useful in future?
      // instances: '2',
      // interpreter: '/bin/bash', // For Production server 2 this line needs to be commented out otherwise it throws an error

    }
  ]
}
