module Api
  module V1
    # Collections controller
    class ResourceCollectionsController < ApplicationController

      resourceful! ResourceCollection, authorize_options: { except: [:index, :show] } do
        ResourceCollection.filtered(with_pagination!(resource_collection_filter_params))
      end

      # GET /collections
      def index
        @collections = load_resource_collections
        render_multiple_resources(
          @collections
        )
      end

      # GET /collections/1
      def show
        @collection = load_resource_collection
        render_single_resource(@collection, include: includes)
      end

      # POST /collections
      def create
        @collection = authorize_and_create_resource_collection(resource_collection_params)
        render_single_resource @collection
      end

      # PATCH/PUT /collections/1
      def update
        @collection = load_and_authorize_resource_collection
        ::Updaters::ResourceCollection.new(resource_collection_params).update(@collection)
        render_single_resource(@collection, include: includes)
      end

      # DELETE /projects/1
      def destroy
        @collection = load_and_authorize_resource_collection
        @collection.destroy
      end

      private

      def includes
        [:project, :resources]
      end

      def scope_for_resource_collections
        ResourceCollection.friendly
      end

    end
  end
end
