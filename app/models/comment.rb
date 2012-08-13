class Comment < ActiveRecord::Base

  belongs_to :user

  validates_presence_of :post_id, :content

  validates_length_of :token, :maximum => 0 # Honeypot

  attr_accessible :post_id, :content, :parent_id, :token

  attr_accessor :token

end
