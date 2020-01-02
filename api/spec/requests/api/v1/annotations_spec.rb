require "swagger_helper"

RSpec.describe "Annotations", type: :request do

  path "/annotations/{id}" do
    include_examples "an API update request", model: Annotation, auth_type: :admin
    include_examples "an API destroy request", model: Annotation, auth_type: :admin
  end

  describe "for a text section" do
    let(:parent) { FactoryBot.create(:text_section) }
    let(:annotation) { FactoryBot.create(:annotation, text_section: parent) }
    let(:text_section_id) { parent.id }

    path "/text_sections/{text_section_id}/relationships/annotations" do
      include_examples "an API index request",
                       model: Annotation,
                       url_parameters: [:text_section_id],
                       tags: "Text Sections"

      include_examples "an API create request",
                       model: Annotation,
                       url_parameters: [:text_section_id],
                       tags: "Text Sections",
                       auth_type: :admin
    end

    path "/text_sections/{text_section_id}/relationships/annotations/{id}" do
      include_examples "an API update request",
                       model: Annotation,
                       url_parameters: [:text_section_id],
                       tags: "Text Sections",
                       auth_type: :admin
    end
  end

  describe "for me" do
    text = FactoryBot.create(:text)
    let(:text_section) { FactoryBot.create(:text_section, text: text) }
    let(:annotation) {
      FactoryBot.create(:annotation, creator: admin, text_section: text_section)
    }

    path "/me/relationships/annotations" do
      let(:'filter[text]') { nil }

      include_examples "an API index request",
                        model: Annotation,
                        auth_type: :admin,
                        included_relationships: [:creator],
                        additional_parameters: [
                          {
                            name: "filter[text]",
                            in: :query,
                            type: :string,
                            required: true
                          }
                        ]
    end

  end

  describe "for a reading group" do
    let(:parent) { FactoryBot.create(:reading_group) }
    let(:annotation) { FactoryBot.create(:annotation, reading_group: parent) }
    let(:reading_group_id) { parent.id }

    path "/reading_groups/{reading_group_id}/relationships/annotations" do
      include_examples "an API index request",
                        model: Annotation,
                        tags: "Reading Groups",
                        url_parameters: [:reading_group_id],
                        paginated: true,
                        included_relationships: [:creator]
    end
  end
end
