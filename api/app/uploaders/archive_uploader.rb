class ArchiveUploader < Shrine
  include Concerns::SharedUploader

  plugin :add_metadata
  plugin :determine_mime_type, analyzer: :marcel
  plugin :module_include
  plugin :moving
  plugin :pretty_location, class_underscore: true, identifier: :location_identifier
  plugin :validation_helpers

  add_metadata :sha256 do |io, context|
    calculate_signature(io, :sha256, format: :hex) if context[:action] == :cache
  end

  add_metadata :files do |io, context|
    if context[:action] == :cache && File.extname(io.path) == ".zip"
      outcome = Utility::InspectZipFile.run path: io.path

      outcome.result if outcome.valid?
    end
  end

  Attacher.validate do
    validate_extension_inclusion %w[zip]
  end

  # rubocop:disable Layout/IndentHeredoc
  attachment_module do
    def included(base)
      super

      module_eval <<~RUBY, __FILE__, __LINE__ + 1
      def #{@name}_content_type
        #{@name}&.content_type
      end

      def #{@name}_file_name
        #{@name}&.original_filename
      end

      def #{@name}_files(fresh: false)
        return [] unless #{@name}.present?

        if fresh
          case #{@name}_content_type
          when "application/zip"
            Utility::InspectZipFile.run! path: #{@name}_path
          else
            []
          end
        else
          #{@name}.metadata.fetch("files", [])
        end
      end

      def #{@name}_path
        #{@name}&.to_io&.path
      end
      RUBY
    end
  end
  # rubocop:enable Layout/IndentHeredoc
end
