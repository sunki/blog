//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var new_comments_binder = function(element, parent_id){

    var $form = $(element);
    //var input = $(element).find('input, textarea');
    var submitButton = $(element).find('input[name="commit"]');

    $form
        .bind("ajax:beforeSend", function(evt, xhr, settings){

// Update the text of the submit button to let the user know stuff is happening.
// But first, store the original text of the submit button, so it can be restored when the request is finished.

            $form.find('div.validation-error').empty().removeClass('alert-box');
            $form.find('small.error').remove();
            $form.find('.error').removeClass('error');

            $(this).data( 'origText', submitButton.attr('value') );
            submitButton.attr( 'value', "Отправка данных..." );
            submitButton.attr('disabled', 'disabled');
        })
        .bind("ajax:success", function(evt, data, status, xhr){

// Reset fields and any validation errors, so form can be used again, but leave hidden_field values intact.
            $form.find('textarea,input[type="text"],input[type="file"]').val("");

// Insert response partial into page below the form.
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
        })
        .bind('ajax:complete', function(evt, xhr, status){

// Restore the original submit button text

            submitButton.attr( 'value', $(this).data('origText') );
            submitButton.removeAttr('disabled');
        })
        .bind("ajax:error", function(evt, xhr, status, error){
            var $form = $(this),
                errors,
                errorText;

            try {
// Populate errorText with the comment errors
                errors = $.parseJSON(xhr.responseText);

                for ( error in errors ) {
                    //errorText += "<li>" + error + ': ' + errors[error] + "</li> ";
                    var item = $(this).find('#items_' + error);
                    item.addClass('error');
                    item.after('<small class="error">' + errors[error] + '</small>')
                }
            } catch(err) {
// If the responseText is not valid JSON (like if a 500 exception was thrown), populate errors with a generic error message.

                $form.find('div.validation-error').html('Неизвестная ошибка, попробуйте чуть позже').addClass('alert-box alert');
            }
        })
        .bind('click',function(){
            //this.unbind();
        });

}

$(document).ready(new_comments_binder('#new_items'));

