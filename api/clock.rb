require "clockwork"
require "./config/boot"
require "./config/environment"

# This file contains configuration for our background jobs run via Clockwork.
module Clockwork
  handler do |job|
    case job
    when "queue_fetch_project_tweets"
      ::QueueFetchProjectTweets.perform_later
    when "update_statistics"
      ::UpdateAnalyticsCache.perform_later
    end
  end

  every(1.day, "expire_shrine_cache", at: "22:00", tz: "America/Los_Angeles") do
    ExpireShrineCacheJob.perform_later
  end

  every(1.day, "expire_tus_uploads", at: "23:00", tz: "America/Los_Angeles") do
    ExpireTusUploadsJob.perform_later
  end

  every(1.hour, "queue_fetch_project_tweets")
  every(4.hours, "update_statistics")
end
