module ApplicationHelper

  TITLE_SEPARATOR = ' :: '

  def build_title base=''
    title = @post ? "#{@post.title} #{TITLE_SEPARATOR} " : ''
    title + base
  end

end
