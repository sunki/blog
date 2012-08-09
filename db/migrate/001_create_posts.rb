class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title,   :null => false
      t.text   :desc,    :null => false
      t.text   :content, :null => false

      t.timestamps
    end
  end
end
