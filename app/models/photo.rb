class Photo < ActiveRecord::Base

  attr_accessible :file

  mount_uploader :file, PhotoUploader

  before_save :save_photo_dimensions

  private

  def save_photo_dimensions
    %w[ thumb ].each do |version|
      if file.present? && file_changed?
        send "#{version}_width=",  file.send(version).dimensions[:width]
        send "#{version}_height=", file.send(version).dimensions[:height]
      end
    end
  end

end
