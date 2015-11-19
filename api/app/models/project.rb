# The project model is the primary unit of Manifold.
class Project < ActiveRecord::Base
  has_many :texts
  include Collaborative

  has_attached_file :cover, include_updated_timestamp: false
  validates_attachment_content_type :cover, content_type: %w(
    image/gif
    image/jpeg
    image/jpg
    image/png
    image/svg+xml
  )
  validates_attachment_file_name :cover, matches: [
    /gif\Z/,
    /jpe?g\Z/,
    /png\Z/,
    /svg\Z/
  ]
end
