# -*- encoding : utf-8 -*-

class PhotoUploader < CarrierWave::Uploader::Base

  include CarrierWave::MimeTypes
  include CarrierWave::MiniMagick

  process :set_content_type

  storage :file

  #def store_dir
  #  Rails.root + 'uploads/attachments'
  #end

  #def file_path
  #  store_dir + original_filename
  #end

  def extension_white_list
    %w[ txt jpg jpeg gif png ]
  end

  version :thumb do
    process :resize_to_limit => [200, 200]
    process :get_dimensions
    process :quality => 81

    attr_reader :dimensions
  end

  def get_dimensions
    width, height = `identify -format "%wx%h" #{file.path}`.split(/x/)
    @dimensions = { :width => width, :height => height }
  end

  def filename
    if original_filename
      fname_parts = original_filename.split('.')
      "#{fname_parts[0]}-#{Time.now.to_i}.#{fname_parts[1]}"
    end
  end

end