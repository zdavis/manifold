#!/usr/bin/env ruby

require 'json'

script_dir = File.expand_path(File.dirname(__FILE__))
repo_dir = File.expand_path("#{script_dir}/..")

Dir.chdir(repo_dir) {
  Dir.chdir('api') {
    unless File.exists?("config/secrets.yml")
      puts "Creating API secrets file"
      puts `rails g manifold:install`
    end
  }
}
