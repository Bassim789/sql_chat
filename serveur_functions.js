

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
		}
	});
}


// AJAX GET MORE MESSAGES
function ajax_get_more_messages()
{
	$.ajax
	({
		type: 'POST',
		url: 'get_more_messages.php',
		data: {},
		success: function (messages)
		{
			if (messages.trim() != 'none')
			{
				var old_height = $(document).height();
				var old_scroll = $(window).scrollTop();
				$('#message_list').prepend(messages);
				var scroll_to = old_scroll + $(document).height() - old_height;
				$(document).scrollTop(scroll_to);
			}
			else
			{
				top_message = true;
			}

			catching = false;
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
		}
	});
}






