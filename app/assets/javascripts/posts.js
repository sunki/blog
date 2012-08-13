//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var new_comments_binder = function(element, parent_id){

    var input = $(element).find('input, textarea');
    var submitButton = $(element).find('input[name="commit"]');

    $(element)
        .bind("ajax:beforeSend", function(evt, xhr, settings){

// Update the text of the submit button to let the user know stuff is happening.
// But first, store the original text of the submit button, so it can be restored when the request is finished.

            $(this).data( 'origText', submitButton.attr('value') );
            submitButton.attr( 'value', "Отправка данных..." );

            input.attr('disabled', 'disabled');
        })
        .bind("ajax:success", function(evt, data, status, xhr){
            var $form = $(this);

// Reset fields and any validation errors, so form can be used again, but leave hidden_field values intact.
            $form.find('textarea,input[type="text"],input[type="file"]').val("");
            $form.find('div.validation-error').empty();

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

            input.removeAttr('disabled');
        })
        .bind("ajax:error", function(evt, xhr, status, error){
            var $form = $(this),
                errors,
                errorText;

            try {
// Populate errorText with the comment errors
                errors = $.parseJSON(xhr.responseText);
            } catch(err) {
// If the responseText is not valid JSON (like if a 500 exception was thrown), populate errors with a generic error message.
                errors = {message: "Please reload the page and try again"};
            }

// Build an unordered list from the list of errors
            errorText = "There were errors with the submission: \n<ul>";

            for ( error in errors ) {
                errorText += "<li>" + error + ': ' + errors[error] + "</li> ";
            }

            errorText += "</ul>";

// Insert error list into form
            $form.find('div.validation-error').html(errorText);
        })
        .bind('click',function(){
            //this.unbind();
        });

}

$(document).ready(new_comments_binder('#new_items'));

