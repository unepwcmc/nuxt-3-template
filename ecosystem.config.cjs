// This if for local machine deployment paird with PM2
require('dotenv').config({ path: '/Users/yuelongh/Documents/WCMC/pp-data-management-portal/.env' }) // Update the path to the project root folder

module.exports = {
  apps: [
    {
      name: 'nuxt-3-template',
      script: 'yarn start', // If you change the node version here then please also change the version in ~/config/deploy.rb
      port: '8081' // This will be used to launch the server so it becomes http://localhost:8081 make sure the port is free for usuage
    }
  ]
}
