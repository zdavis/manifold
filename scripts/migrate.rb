#!/usr/bin/env ruby

require 'json'

script_dir = File.expand_path(File.dirname(__FILE__))
repo_dir = File.expand_path("#{script_dir}/..")

Dir.chdir(repo_dir) {
  Dir.chdir('api') {
    puts `./bin/spring stop`
    puts "Running migrations"
    puts `./bin/rake db:migrate`
    puts "Migrations complete"
  }
}
