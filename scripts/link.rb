#!/usr/bin/env ruby

require 'json'

script_dir = File.expand_path(File.dirname(__FILE__))
repo_dir = File.expand_path("#{script_dir}/..")

Dir.chdir(repo_dir) {
  directories = Dir.glob('*').select {|f| File.directory? f}

  module_paths = directories.select do |directory|
    exist = false
    Dir.chdir(directory) {
      exist = File.exists?("package.json")
    }
    puts "Found node module directory: #{directory}" if exist
    exist
  end

  node_modules = module_paths.map do |node_module_dir|
    Dir.chdir(node_module_dir) {
      package_file = File.read("package.json")
      package = JSON.parse(package_file)
      {
        :package => package,
        :path => node_module_dir,
        :name => package["name"],
        :dependencies => package["dependencies"]
      }
    }
  end

  node_modules.each do |node_module|
    Dir.chdir(node_module[:path]) {
      puts "Linking node module #{node_module[:name]}"
      puts `npm link`
    }
  end

  node_modules.each do |link_from|
    Dir.chdir(link_from[:path]) {
      node_modules.each do |link_to|
        if link_from[:name] != link_to[:name]
          puts `npm link #{link_to[:name]}`
        end
      end
    }
  end
}
