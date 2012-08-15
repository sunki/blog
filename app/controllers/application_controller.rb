class ApplicationController < ActionController::Base
  protect_from_forgery

  def render_404
    render '404', :status => 404
  end

  private

  rescue_from ActiveRecord::RecordNotFound do
    render_404
  end

end
