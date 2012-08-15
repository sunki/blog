class ApplicationController < ActionController::Base
  protect_from_forgery

  def render_404
    render '404', :status => 404
  end

  private

  helper_method :log

  rescue_from ActiveRecord::RecordNotFound do
    render_404
  end

  def log message
    Rails.logger.debug message.inspect
  end

end
