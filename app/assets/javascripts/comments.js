//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

function append_comment_form(element) {
    $('.comments-answer').html('');

    var form = $('#new_comment').clone();
    form.addClass('comments-answer');
    $(element).after(form);

    new_comments_binder(form, $(element).parents('.row:first').parent().find('.row:last'));
}
