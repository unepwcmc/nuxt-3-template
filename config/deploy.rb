# frozen_string_literal: true

# config valid for current version and patch releases of Capistrano
lock '~> 3.17.2'

set :application, 'nuxt-3-example'
set :repo_url, 'git@github.com:unepwcmc/nuxt-3-template.git'

set :nvm_type, :user # or :system, depends on your nvm setup
# set :nvm_node, 'v19.9.0'
set :nvm_map_bins, %w[node npm yarn]

set :yarn_flags, '--silent --no-progress'
set :yarn_target_path, -> { release_path }

set :puma_enable_socket_service, true
set :puma_access_log, "#{shared_path}/log/puma_access.log"
set :puma_error_log, "#{shared_path}/log/puma_error.log"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

set :deploy_user, 'wcmc'

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/#{fetch(:deploy_user)}/#{fetch(:application)}"

# Default value for :scm is :git
set :scm, :git
set :scm_username, 'unepwcmc-read'

namespace :deploy do
  desc 'yarn_build'
  task :yarn_build do
    on roles(:app), in: :sequence, wait: 5 do
      execute "cd #{release_path}; yarn build"
    end
  end
end

after 'deploy:publishing', 'deploy:yarn_build'

# namespace :deploy do
# desc 'yarn_generate'
#   task :yarn_generate do
#   on roles(:app), in: :sequence, wait: 5 do
#   execute "cd '#{release_path}/nuxt-frontend}'; yarn generate"
#      end
#    end
# end

# after 'deploy:publishing', 'deploy:yarn_generate'

set :ssh_options, {
  forward_agent: true
}

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
set :linked_files, %w[.env]

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

namespace :deploy do
  desc 'Restart Application'
  task :pm2_restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "cd '#{release_path}'; pm2 restart #{fetch(:application)}"
    end
  end
end

after 'deploy:publishing', 'deploy:pm2_restart'
