# Known Issues

- If you see the deployment is locked then do bundle `bundle exec kamal lock release -d staging` or `bundle exec kamal lock release -d production` to release the lock. It is likly the previous deployment was not done in a proper way i,e exited while deploying the app. see [here](https://kamal-deploy.org/docs/commands/lock/)