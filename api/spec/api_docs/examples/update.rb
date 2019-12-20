shared_examples_for "an API update request" do |options|
  include_context("authenticated request")
  include_context("param helpers")

  api_spec_helper = ApiDocs::Helpers::Request.new(options, :update)

  let(:resource_instance) do
    defined?(resource) ? resource : FactoryBot.create(api_spec_helper.factory)
  end
  let(:id) { resource_instance.id }
  let(:body) { json_structure_for(api_spec_helper.factory) }

  patch api_spec_helper.summary do
    api_spec_helper.parameters.each do |parameter_options|
      parameter(parameter_options)
    end
    description api_spec_helper.response_description if api_spec_helper.response_description?
    produces api_spec_helper.content_type
    consumes api_spec_helper.content_type
    security [apiKey: []]
    tags api_spec_helper.tags

    response "200", api_spec_helper.success_description, focus: api_spec_helper.focus do
      let(:Authorization) { get_user_token(api_spec_helper.auth_type) }
      schema api_spec_helper.response
      run_test!
    end

    unless api_spec_helper.exclude_403
      response "403", I18n.t("swagger.access_denied"), focus: api_spec_helper.focus do
        let(:Authorization) {}
        run_test!
      end
    end
  end
end