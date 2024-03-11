/**
 *  By default running './.output/server/index.mjs' will not laod ~/.env so
 * you need to load .env here
 * Not sure how productino server pm2 was setup as it does not require dotenv in staging/production servers
 * */
require('dotenv').config({ path: '/Users/yuelongh/Documents/WCMC/nuxt-3-template/.env' })

module.exports = {
  apps: [
    {
      name: 'nuxt-3-template',
      script: './.output/server/index.mjs', // If you change the node version here then please also change the version in ~/config/deploy.rb
      port: '8083', // This will be used to launch the server so it becomes http://localhost:8083 make sure the port is free in production server
      exec_mode: 'cluster'
    }
  ]
}
