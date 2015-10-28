

// SET ID
id_pseudo = "#input_pseudo";
id_textarea = "#input_message";


// SET INTERVAL TIME IN MS
interval_time_new_message = 3000;
interval_time_reload_all_messages = 30000;

// ON START
$( window ).load(function()
{
    ajax_get_messages('reload');

    setInterval(function()
    {
        ajax_get_messages('append');
    }, interval_time_new_message);

    setInterval(function()
    {
        ajax_get_messages('reload');
    }, interval_time_reload_all_messages);

    if (on_desktop())
    {
        $(id_textarea).focus();
    }

    $('#loading').hide();
});


// CATCH KEYDOWN IN TEXTAREA
$(id_textarea).keydown(function(event)
{
    if(isSend(event))
    {
        send_message();
    }
});


// CATCH KEYUP IN TEXTAREA
$(id_textarea).keyup(function(event)
{
    if(isSend(event))
    {
        $(id_textarea).val('');
    }
    adapt_textarea_height(id_textarea);
});


// CHECK IF MESSAGE IS SEND ON PRESS ENTER
function isSend(event)
{
    var is = false;
    // CATCH ENTER WITHOUT SHIFT ON DESKTOP
    if(event.keyCode == 13 && !event.shiftKey && on_desktop())
    {
        is = true;
    }
    return is;
}


// CHECK IF DESKTOP OR MOBILE
function on_desktop()
{
    return $(window).width() > 800;
}


// ADAPT TEXTAREA HEIGHT
function adapt_textarea_height(id)
{
    var rows = $(id).val().split("\n");
    var len = 30;
    if (on_desktop()){
        len = 80;
    }
    var compteur = 1;
    for (var i = rows.length - 1; i >= 0; i--)
    {
        if (rows[i].length > len)
        {
            compteur += Math.round((rows[i].length)/len);
        }
        compteur += 1;
    };
    $(id).prop("rows", compteur);
}


// SEND MESSAGE
function send_message()
{
    var pseudo = $(id_pseudo).val();
    var text = $(id_textarea).val();
    $(id_textarea).val('');
    if (on_desktop())
    {
        $(id_textarea).focus();
    }
    adapt_textarea_height(id_textarea);
    ajax_send_message(pseudo, text);
}


// AJAX SEND MESSAGE TO PHP
function ajax_send_message(pseudo, text)
{
    $('#loading').css('display', 'inline-block');
    $.ajax
    ({
        type: 'POST',
        url: 'message_save.php',
        data: {'pseudo' : pseudo, 'text' : text},
        success: function ()
        {   
            ajax_get_messages('append');          
        },
        error: function (err)
        {
            $('#loading').hide();
            console.log('error: ajax_send');
        } 
    });
}



// AJAX GET MESSAGES FROM PHP
first_load = 'true';
function ajax_get_messages(mode)
{
    var pseudo = $(id_pseudo).val();
    $.ajax
    ({
        type: 'POST',
        url: 'messages_get.php',
        data: {'first_load' : first_load, 'mode' : mode, 'pseudo' : pseudo},
        success: function (messages)
        {   
            if (mode == 'append')
            {
                $('#message_list').prepend(messages);
            }

            else if (mode == 'reload')
            {
                $('#message_list').html(messages);
            }

            $('#loading').hide();
            first_load = 'false';
        },
        error: function (err)
        {
            console.log('error: ajax_get');
        } 
    });
}











