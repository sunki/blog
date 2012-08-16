class CommentsController < ApplicationController

  layout false

  def create
    @comment = Comment.new params[:items]
    render_save @comment.save
  end

  def update
    @comment = Comment.find params[:id]
    render_save @comment.update_attributes(params[:items])
  end

  private

  def render_save is_saved
    if is_saved
      render(:_item)
    else
      errors = @comment.errors
      errors.delete :token

      render :json => errors, :status => :unprocessable_entity
    end
  end

end
