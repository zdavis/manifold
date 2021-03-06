module ApiDocs
  module Definitions
    module Resources
      class TextCategory

        REQUIRED_CREATE_ATTRIBUTES = [:title].freeze

        class << self

          include ApiDocs::Definitions::Resource

        end
      end
    end
  end
end
