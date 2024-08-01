# Nuxt-3-template

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Quick Start

- If you are using @unepwcmc/xxx please complete instructions below first
- `yarn install` to install the dependencies
- `yarn dev` to start dev server

## To download @unepwcmc/xxx packages

- Follow [the instruction](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) to generate your Github token
- add your token to npmrc
- `nano ~/.npmrc`
- Add `//npm.pkg.github.com/:_authToken=your_token` to your `~/.npmrc` file

## Run Production server locally

Run Production locally (Only for testing purpose not for production server)

```bash
yarn preview
```

```bash
yarn build && yarn start
```

or you can use pm2 to run the production server there is a [ecosystem.config.cjs](./ecosystem.config.cjs) for you to test. Only use PM2 for running production mode for testing locally. Please use kamal for deployment for running production server

- Update [ecosystem.config.cjs](./ecosystem.config.cjs)
- Run `yarn pm2` - to start the app on PM2
- Run `yarn pm2d` - to remove the app on PM2

## Deployment

We use Kamal for deployment

- In project root folder run `bundle install`
- Create a `.env.staging` and `.env.production` in the project root folder (in your local machine - here). \*\* The template is in [.env.staging.example](./.env.staging.example)
- (Only needed when first time deploying the app) Run `bundle exec kamal env push -d staging` or `bundle exec kamal env push -d production` to setup envs
- Run `bundle exec kamal deploy -d staging` - for staging server deployment
- Run `bundle exec kamal deploy -d production` - for production server deployment

## Change Staging/production server envs

- You can change envs in `.env.staging` or `.env.production`.
- If you are adding new envs then make sure you also include the envs in [deploy.staging.yml](./config/deploy.staging.yml) and [deploy.production.yml](./config/deploy.production.yml).
- After changing envs in [deploy.staging.yml](./config/deploy.staging.yml), [deploy.production.yml](./config/deploy.production.yml), `.env.staging` or `.env.production` please run the following command to refresh the environmental variables on servers
  - For staging server
    - `bundle exec kamal env push -d staging` - to update envs on staging server
    - `bundle exec kamal app boot -d staging` - to reboot Nuxt app to use the new envs
  - For production server
    - `bundle exec kamal env push -d production` - to update envs on production server
    - `bundle exec kamal app boot -d production` - to reboot Nuxt app to use the new envs

## How to reboot server

- `bundle exec kamal app boot -d staging`
- `bundle exec kamal app boot -d production`

## See server logs

- `bundle exec kamal app logs -d staging`
- `bundle exec kamal app logs -d production`

## Known Issues

- We recommend you to read [known issues section](./doc/known-issues.md)
