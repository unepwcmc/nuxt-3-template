const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

// this function will return all variables in `.env` file but NOT set them to `process.env`
const getEnvVariables = () => {
  const envPath = path.join(__dirname, '.env')
  const envConfig = dotenv.parse(fs.readFileSync(envPath))
  if (Object.keys(envConfig).length === 0) {
    throw new Error(`No Environment variables found in ${envPath}. Are you sure? If you are sure, then remove me/the check in ${envPath}`)
  }
  return envConfig
}

module.exports = {
  apps: [
    {
      name: 'nuxt-3-template',
      script: '/home/wcmc/.nvm/versions/node/v21.7.1/bin/node ./.output/server/index.mjs', // If you change the node version here then please also change the version in ~/config/deploy.rb
      port: '8084', // This will be used to launch the server so it becomes http://localhost:8083 make sure the port is free in production server
      cwd: '/home/wcmc/nuxt-3-template/current/',
      exec_mode: 'cluster',
      env: getEnvVariables() // Nuxt 3 does not load .env automatically https://nuxt.com/docs/guide/directory-structure/env
      // interpreter: '/bin/bash', // For Production server 2 this line needs to be commented out otherwise it throws an error

    }
  ]
}
/***
For very first time of deployment after seeing error from pm2 about not reconising xxx nuxt app go to the current folder do
    # pm2 start ecosystem.config.cjs
    # pm2 save
    # pm2 always uses the ecosystem.config.cjs when you do pm2 start and save for very first time after that if you do change config in ecosystem.config.cjs make sure do
    # pm2 delete xxx_app_name then -> pm2 save then -> pm2 start ecosystem.config.cjs -> pm2 save to let pm2 use the latest ecosystem.config.cjs config
***/
