# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'manifold_reader'
set :repo_url, 'git@github.com:ManifoldScholar/manifold-reader.git'
set :deploy_to, '/home/manifold_reader/manifold_reader'
set :scm, :git
set :format, :pretty
set :log_level, :debug

set :linked_dirs, %w{node_modules}
set :linked_files, []


namespace :deploy do

  desc 'Compile Assets'
  task :compile_assets do
  	on roles(:app), in: :sequence, wait: 5 do
			execute "cd '#{release_path}'; npm run build"
		end
	end

  desc 'Restart application'
	task :restart do
    on roles(:app), in: :sequence, wait: 5 do
	    execute "sudo stop #{fetch(:application)} || true"
      execute "sudo start #{fetch(:application)}"
    end
  end

  after :updated, :compile_assets
  after :published, :restart
end

