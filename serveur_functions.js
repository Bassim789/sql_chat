

// SET ID INPUT HTML
id_pseudo = '#input_pseudo';
id_textarea = '#input_message';


// SET INTERVAL TIME IN MS
interval_time_new_message = 3000;
interval_time_new_stat = 3000;


// ON START
$( window ).load(function()
{
	adapt_textarea_height();
	ajax_get_messages();
	ajax_get_stat();

	setInterval(function()
	{
		ajax_get_messages();
	}, interval_time_new_message);


	setInterval(function()
	{
		update_ranking();
		ajax_get_stat();
	}, interval_time_new_stat);


	if (on_desktop())
	{
		$(id_textarea).focus();
	}

	// SET PSEUDO COOKIE
	$("#input_pseudo").val(getCookie('pseudo'));

});


// UPDATE RANKING IF OPEN
function update_ranking()
{

	// GET ID OF STAT DIV AND GET RANKING
	$('.stat_div_select').each(function() {
		var stat_div = '#' + this.id;
		ajax_get_ranking(stat_div);
	});

}


// AJAX SHOW RANKING
function show_ranking(stat_div)
{
	unselect_all_stat_div();
	$(stat_div).addClass('stat_div_select');
	$('#message_list').hide();
	$('.body_inner').addClass('white');
	$('body,html').animate({scrollTop: 0}, 500);
	ajax_get_ranking(stat_div);
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
	adapt_textarea_height();
	document.cookie = 'pseudo=' + pseudo + '; expires=Sun, 01 Feb 2019 00:00:00 UTC; path=/';
	send_message_call(pseudo, text);
}


// SEND MESSAGE CALL
function send_message_call(pseudo, text)
{
	ajax_send_message(pseudo, text);
}




// EVENT


// CLICK ON SEND BTN
$('#btn_send').click(function(event)
{
	send_message();
});


// CLICK ON CLOSE RANKING
$('#close_ranking').click(function(event)
{
	unselect_all_stat_div();
	$('#ranking').hide();
	$('#close_ranking').hide();
	$('#message_list').show();
	$('.body_inner').removeClass('white');
	scroll_bottom_message();
});


// CLICK ON STAT PSEUDO
$('#nb_pseudo').click(function(event)
{
	show_ranking('#nb_pseudo');
});


// CLICK ON STAT MESSAGE
$('#nb_message').click(function(event)
{
	show_ranking('#nb_message');
});


// CLICK ON STAT CHAR
$('#nb_char').click(function(event)
{
	show_ranking('#nb_char');
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
	adapt_textarea_height();
});




// AJAX


// AJAX SEND MESSAGE TO PHP
function ajax_send_message(pseudo, text)
{
	$.ajax
	({
		type: 'POST',
		url: 'message_save.php',
		data: {'pseudo' : pseudo, 'text' : text},
		success: function (data)
		{   
			ajax_get_messages();
			ajax_get_stat();
			update_ranking();        
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
	$.ajax
	({
		type: 'POST',
		url: 'messages_get.php',
		data: {'first_load' : first_load},
		success: function (messages)
		{   
			if (messages.trim() != '')
			{
				$('#message_list').append(messages);
				scroll_bottom_message();
			}
			
			first_load = 'false';
		},
		error: function (err)
		{
			console.log('error: ajax_get');
		} 
	});
}


// AJAX GET STAT DIV
function ajax_get_stat()
{
	$.ajax
	({
		type: 'GET',
		url: 'stat_get.php',
		success: function (data)
		{   
			// GET DATA
			var data_splited = data.split(';');
			var nb_pseudo = data_splited[0];
			var nb_message = data_splited[1];
			var nb_char = data_splited[2];


			// UPDATE DATA
			$('#nb_pseudo').html(nb_pseudo + '<br>users');
			$('#nb_message').html(nb_message + '<br>msgs');
			$('#nb_char').html(nb_char + '<br>chars');
		},
		error: function (err)
		{
			console.log('error: ajax_get_stat');
		} 
	});
}


// AJAX GET RANKING
function ajax_get_ranking(stat_div)
{
	$.ajax
	({
		type: 'POST',
		url: 'ranking_get.php',
		data: {'stat_div' : stat_div},
		success: function (data)
		{   
			$('#close_ranking').show();
			$('#ranking').html(data).show();
		},
		error: function (err)
		{
			console.log('error: ajax_ranking_get');
		} 
	});
}






