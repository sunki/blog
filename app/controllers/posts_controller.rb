class PostsController < ApplicationController

  def index
    @posts = Post.page params[:page]
  end

  def show
    @post    = Post.find params[:id]
    @comment = Comment.new
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new params[:items]
    @post.save ? redirect_to('/') : render(:new)
  end

  def update
    @post = Post.find params[:id]
    @post.update_attributes(params[:items]) ? redirect_to('/') : render(:new)
  end

end
