# -*- encoding : utf-8 -*-

class Post < ActiveRecord::Base

  has_many :comments

  paginates_per 5

  validates_presence_of :title, :content

  attr_accessible :title, :desc, :content

  scope :published, where('1=1')

  def to_param
    slug
  end

  private

  def slug
    id.to_s + '-' + title.gsub(/[^a-zA-Zа-яА-ЯёЁ0-9\-]/u, '-')
  end

end
