//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var items_errors_clean = function(form) {
    form.find('div.validation-error').empty().removeClass('alert-box');
    form.find('small.error').remove();
    form.find('.error').removeClass('error');
}

var items_submit_process = function(form, button) {
    form.data( 'origText', button.attr('value') );
    button.attr( 'value', "Отправка данных..." );
    button.attr('disabled', 'disabled');
}

var items_submit_complete = function(form, button) {
    button.attr( 'value', form.data('origText') );
    button.removeAttr('disabled');
}

var items_errors_handle = function(form, xhr) {
    try {
        var error;
        var errors = $.parseJSON(xhr.responseText);

        for ( error in errors ) {

            var item = form.find('#items_' + error);

            item.addClass('error');
            item.after('<small class="error">' + errors[error] + '</small>')
        }
    } catch(err) {
// If the responseText is not valid JSON (like if a 500 exception was thrown), populate errors with a generic error message.

        form.find('div.validation-error').html('Неизвестная ошибка, попробуйте чуть позже').addClass('alert-box alert');
    }
}

var new_items_bind = function(element, parent_id, after_save) {

    var form = $(element);
    var submitButton = $(element).find('input[name="commit"]');

    form
        .bind("ajax:beforeSend", function(evt, xhr, settings){

            items_errors_clean(form);
            items_submit_process(form, submitButton);
        })
        .bind("ajax:success", function(evt, data, status, xhr){

// Reset fields and any validation errors, so form can be used again, but leave hidden_field values intact.
            form.find('textarea,input[type="text"],input[type="file"]').val("");

            after_save(xhr);
        })
        .bind('ajax:complete', function(evt, xhr, status){
            //var form = $(this);

            items_submit_complete(form, submitButton)
        })
        .bind("ajax:error", function(evt, xhr, status, error){
            //var form = $(this);

            items_errors_handle(form, xhr)
        })
}

var new_comments_bind = function(element, parent_id) {

    var after_save = function(xhr) {

        var new_comment = xhr.responseText;
        var root = $('#comments');

        if(!parent_id) {
            root.append(new_comment);
        }
        else {
            var children = $('#children-' + parent_id);
            var comment  = $('#comment-' + parent_id);

            if(children.length) {
                children.append(new_comment);
            }
            else {
                comment.after('<div id="children-' + parent_id + '" class="comments-children">' + new_comment + '</div>');
            }
        }
    }

    new_items_bind(element, parent_id, after_save);
}

$(document).ready(function() {
    new_comments_bind('#new_items');
});

var tiny_ajax_save = function() {

    var form = $('#post_form');
    var message = form.find('div.success-message');

    message.empty().removeClass('alert-box');
    items_errors_clean(form);

    $.ajax({
        type: form.attr('method'),
        url:  form.attr('action'),
        data: form.serializeArray(),
        dataType: 'json',
        success: function(data) {
            message.html('Данные сохранены').addClass('alert-box success');
        },
        error: function(data) {
            items_errors_handle(form, data);
        }
    });
}

