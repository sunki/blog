class PhotosController < ApplicationController

  def create
    @photo = Photo.new :file => params[:file]
    @photo.save ? render(:json => {}) : render(:json => @photo.errors, :status => :unprocessable_entity)
  end

end
