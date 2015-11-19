class AddProjectIdToCollaborators < ActiveRecord::Migration
  def change
    add_column :collaborators, :project_id, :integer
  end
end
