class AddProjectIdToTexts < ActiveRecord::Migration
  def change
    add_column :texts, :project_id, :integer
  end
end
