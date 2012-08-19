class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string  :file
      t.integer :thumb_width
      t.integer :thumb_height
      t.integer :main_width
      t.integer :main_height

      t.timestamps
    end
  end
end
