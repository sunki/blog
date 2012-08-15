module ApplicationHelper

  TITLE_SEPARATOR = ' :: '

  def build_title base=''
    title = @post && !@post.new_record? ? "#{@post.title} #{TITLE_SEPARATOR} " : ''
    title + base
  end

end
