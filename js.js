

// SET ID
id_pseudo = "#input_pseudo";
id_textarea = "#input_message";


// SET INTERVAL TIME IN MS
interval_time_new_message = 3000;

// ON START
$( window ).load(function()
{
    ajax_get_messages();

    setInterval(function()
    {
        ajax_get_messages();
    }, interval_time_new_message);

    if (on_desktop())
    {
        $(id_textarea).focus();
    }

    // SET PSEUDO COOKIE
    $("#input_pseudo").val(getCookie('pseudo'));

});




// GET COOKIE
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ')
        {
            c = c.substring(1);
        } 
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


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
    document.cookie = 'pseudo=' + pseudo + '; expires=Sun, 01 Feb 2019 00:00:00 UTC; path=/';
}



// EVENT


// CLICK ON SEND BTN
$('#btn_send').click(function(event)
{
    send_message();
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




// AJAX SEND MESSAGE TO PHP
function ajax_send_message(pseudo, text)
{
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
            console.log('error: ajax_send');
        } 
    });
}


// AJAX GET MESSAGES FROM PHP
first_load = 'true';
function ajax_get_messages()
{
    var pseudo = $(id_pseudo).val();
    $.ajax
    ({
        type: 'POST',
        url: 'messages_get.php',
        data: {'first_load' : first_load, 'pseudo' : pseudo},
        success: function (messages)
        {   
            $('#message_list').prepend(messages);
            first_load = 'false';
        },
        error: function (err)
        {
            console.log('error: ajax_get');
        } 
    });
}











