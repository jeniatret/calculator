class AddImageToClassified < ActiveRecord::Migration
  def change
    add_column :classifieds, :image, :string
  end
end
