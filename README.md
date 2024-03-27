# TODO add github token https://github.com/unepwcmc/wcmc-vue-svg-icons


# Nuxt-3-template

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Quick Start
- ```npm login``` and use unep-wcmc npm account to login. (You only need to do this if you plan to use @unepwcmc packages as they are set as private packages.)
- ```yarn install``` to install the dependencies
- ```yarn dev``` to start dev server

## To download @unepwcmc/xxx packages
- Follow [the instruction](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) to generate your Github token
- ```nano ~/.npmrc``` - add your token to npmrc
- ```//npm.pkg.github.com/:_authToken=your_token``` - Add your generated token to your_token

## Run Production server locally

Run Production locally (Only for testing purpose not for production server)

```bash
yarn preview
```

To mimic how production server starts the app
- ```yarn build``` to build the application
- changes correct paths that suits your local machine in [ecosystem.local.config.cjs](./ecosystem.local.config.cjs)
- ```pm2 start ecosystem.local.config.cjs``` to start the application by using PM2
- ```pm2 save``` to save ```ecosystem.local.config.cjs``` the configuration
- If you change anything inside ```ecosystem.local.config.cjs``` then you need to
    - ```pm2 delete name_inside_ecosystem.local.config.cjs```
    -  ```pm2 start ecosystem.local.config.cjs```
    - ```pm2 save```
## Deployment
- in project root folder
- run ```bundle install```
- run ```bundle exec cap staging deploy``` - for staging server deployment
- run ```bundle exec cap production deploy``` - for production server deployment

## Update envs on production server

In Nuxt 3 when the server is ran in production mode, Nuxt 3 does NOT load env file so loading .env file will be the task inside [ecosystem.config.cjs](./ecosystem.config.cjs) and due to the nature of PM2 you MUST delete current app instace on PM2 and save the app instacne to make PM2 uses new environment variables you updated in .env
- ```pm2 delete nuxt-3-template```
- ```pm2 start ecosystem.config.cjs```
- ```pm2 save```
- Done

## Known Issues
- We recommend you to read [known issues section](./doc/known-issues.md)

