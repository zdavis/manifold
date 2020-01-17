module ApiDocs
  module Definitions
    module Resources
      class Stylesheet

        REQUIRED_CREATE_ATTRIBUTES = [:name].freeze

        READ_ONLY_RELATIONSHIPS = [:text].freeze

        class << self
          include Resource
        end
      end
    end
  end
end
