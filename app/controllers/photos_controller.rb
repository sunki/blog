class PhotosController < ApplicationController

  def create
    file = params[:file]
    file.original_filename = sanitize_filename(file.original_filename)

    @photo = Photo.new :file => file

    if @photo.save
      render :json => {}
    else
      render :json => @photo.errors, :status => :unprocessable_entity
    end
  end

  private

  def sanitize_filename fname
    fname = I18n.transliterate fname
    fname.gsub! /[^a-zA-Z0-9\.\-_]/, ''
    fname
  end

end
