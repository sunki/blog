module CommentsHelper

  def render_comments comments
    return if comments.blank?

    html = ''
    @comments = comments.group_by(&:parent_id)

    @comments[nil].each { |item| render_item item, html }
    html
  end

  def render_item item, html
    html << render( :partial => 'comments/item', :locals => { :item => item } )

    children = @comments[item.id]

    children.each do |child|
      html << %{ <div id="children-#{child.parent_id}" class="comments-children"> }
      render_item child, html
      html << '</div>'
    end if children
  end

end
