class PostsController < ApplicationController

  def index
    @posts = Post.published.order('id DESC').page params[:page]
  end

  def show
    @post    = Post.find params[:id]
    @comment = Comment.new
  end

  def new
    @post = Post.new
  end

  def edit
    @post = Post.find params[:id]
    render :new
  end

  def create
    @post = Post.new params[:items]
    render_save @post.save
  end

  def update
    @post = Post.find params[:id]
    render_save @post.update_attributes(params[:items])
  end

  private

  def render_save is_saved
    respond_to do |format|
      if is_saved
        format.html { redirect_to post_path(@post) }
      else
        format.html { render :new }
        format.json { render :json => @post.errors, :status => :unprocessable_entity }
      end
    end
  end

end
