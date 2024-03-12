/**
 * By default running './.output/server/index.mjs' will not laod ~/.env so
 * you need to load .env here.
 * Do not load env in this way on production server as it might mess up with other environments maybe?
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
