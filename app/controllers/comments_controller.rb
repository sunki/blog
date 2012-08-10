class CommentsController < ApplicationController

  layout false

  def create
    @comment = Comment.new params[:comment]
    @comment.save ? render(:_item) : render_error(@comment.errors)
  end

  def update
    @comment = Comment.find params[:id]
    @comment.update_attributes(params[:items]) ? render(:_item) : render_error(@comment.errors)
  end

  private

  def render_error errors
    render :json => errors, :status => :unprocessable_entity
  end

end
