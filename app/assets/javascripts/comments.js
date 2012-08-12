//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

function append_comment_form(element, parent_id) {
    $('.comments-answer').html('');

    var form = $('#new_items').clone();

    form.addClass('comments-answer');
    form.append('<input type="hidden" name="items[parent_id]" value="' + parent_id +'" />');
    $(element).after(form);

    new_comments_binder(form, '#children-' + parent_id, '#comment-' + parent_id);
}
