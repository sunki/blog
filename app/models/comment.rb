class Comment < ActiveRecord::Base

  belongs_to :user

  validates_presence_of :post_id, :content

  attr_accessible :post_id, :content, :parent_id

end
