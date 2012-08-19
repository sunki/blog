class CreateUploadedFiles < ActiveRecord::Migration
  def change
    create_table :uploaded_files do |t|
      t.string  :type
      t.string  :file
      t.integer :thumb_width
      t.integer :thumb_height
      t.integer :main_width
      t.integer :main_height

      t.timestamps
    end
  end
end
