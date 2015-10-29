#!/usr/bin/env ruby

setup_scripts = ['dependencies.rb','link.rb','migrate.rb']

script_dir = File.expand_path(File.dirname(__FILE__))
Dir.chdir(script_dir ) {
  setup_scripts.each do |setup_script|
    IO.popen("./#{setup_script}") do |process|
      process.each { |line| puts line }
    end
  end
}
