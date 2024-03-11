# config valid for current version and patch releases of Capistrano
lock '~> 3.17.2'

set :application, 'nuxt-3-template'
set :repo_url, 'git@github.com:unepwcmc/nuxt-3-template.git'

set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, 'v21.7.1' #TODO This can be upgraded to the latest node version (v.21 as 04Mar2024) Frontend dev please coordinate with devOps #If changing version here also change version in ecosystem.config.cjs /home/wcmc/.nvm/versions/node/vxx.x.x/bin/node
set :node_version_for_pm2, 'v16.8.0' # Don't change this unless you want to use a pm2 that's sitting in another node folder /home/wcmc/.nvm/versions/node/vxx.x.x/bin/pm2, asl devOps for more details
set :nvm_map_bins, %w[node npm yarn]

set :yarn_flags, '--silent --no-progress'
set :yarn_target_path, -> { release_path }

set :puma_enable_socket_service, true
set :puma_access_log, "#{shared_path}/log/puma_access.log"
set :puma_error_log, "#{shared_path}/log/puma_error.log"

set :deploy_user, 'wcmc'

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/#{fetch(:deploy_user)}/#{fetch(:application)}"

# Default value for :scm is :git
set :scm, :git
set :scm_username, 'unepwcmc-read'

namespace :deploy do
  desc 'build_nuxt_app & yarn install/build'
  task :build_nuxt_app do
    on roles(:app) do
      #TODO This line is working but needs improvement !!!!!!!
      execute "cd #{release_path} && . ~/.nvm/nvm.sh && node -v && nvm use #{fetch(:nvm_node)} && yarn install && yarn build"
    end
  end
end

after 'deploy:publishing', 'deploy:build_nuxt_app'

set :ssh_options, {
  forward_agent: true
}

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
set :linked_files, %w[.env]

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for keep_releases is 5
set :keep_releases, 5

namespace :deploy do
  desc 'Restart Application'
  task :pm2_restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "cd '#{release_path}'; /home/wcmc/.nvm/versions/node/#{fetch(:node_version_for_pm2)}/bin/pm2 restart #{fetch(:application)}"
    end
  end
end
    #For very first time of deployment after seeing error from pm2 about not reconising xxx nuxt app go to the current folder do 
    # pm2 start ecosystem.config.cjs
    # pm2 save
    # pm2 always uses the ecosystem.config.cjs when you do pm2 start and save after that if you do change ecosystem.config.cjs make sure do 
    # pm2 delete xxx_app_name then -> pm2 save then -> pm2 start ecosystem.config.cjs -> pm2 save to let pm2 use the latest ecosystem.config.cjs config
after 'deploy:publishing', 'deploy:pm2_restart'
