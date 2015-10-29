#!/usr/bin/env ruby

script_dir = File.expand_path(File.dirname(__FILE__))
Dir.chdir(script_dir ) {
  IO.popen('./link.rb') do |process|
    process.each { |line| puts line }
  end
}
