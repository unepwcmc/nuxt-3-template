 # Nuxt-3-template

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Quick Start
- ```npm login``` and use unep-wcmc npm account to login. (You only need to do this if you plan to use @unep-wcmc packages as they are set as private packages.)
- ```yarn install``` to install the dependencies
- ```yarn dev``` to start dev server


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
- run ``` bundle exec cap staging deploy``` - for staging server deployment
- run ``` bundle exec cap production deploy``` - for production server deployment


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
