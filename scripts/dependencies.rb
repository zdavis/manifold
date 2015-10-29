#!/usr/bin/env ruby

require 'json'

script_dir = File.expand_path(File.dirname(__FILE__))
repo_dir = File.expand_path("#{script_dir}/..")

Dir.chdir(repo_dir) {
  directories = Dir.glob('*').select {|f| File.directory? f}
  directories.each do |directory|
    Dir.chdir(directory) {
      if File.exists?("package.json")
        puts "Found package.json in #{directory}"
        puts `npm install`
      end

      if File.exists?("Gemfile")
        puts "Found Gemfile in #{directory}"
        puts `bundle install`
      end
   }
  end
}
