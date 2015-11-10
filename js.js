

// SET ID
id_pseudo = "#input_pseudo";
id_textarea = "#input_message";


// SET INTERVAL TIME IN MS
interval_time_new_message = 3000;
interval_time_new_stat = 3000;


// ON START
$( window ).load(function()
{
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


// GET COOKIE
function getCookie(cname)
{
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


// UNSELECT ALL STAT DIV
function unselect_all_stat_div()
{
	var stats_div = ['#nb_pseudo', '#nb_message', '#nb_char'];
	stats_div.forEach(function(stat_div)
	{
		$(stat_div).removeClass('stat_div_select');
	});
}


// UPDATE RANKING IF OPEN
function update_ranking()
{

	// GET ID OF STAT DIV AND GET RANKING
	$('.stat_div_select').each(function() {
		var stat_div = '#' + this.id;
		ajax_get_ranking(stat_div);
	});

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


// AJAX SHOW RANKING
function show_ranking(stat_div)
{
	unselect_all_stat_div()
	$(stat_div).addClass('stat_div_select');
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


// CLICK ON CLOSE RANKING
$('#close_ranking').click(function(event)
{
	unselect_all_stat_div();
	$('#ranking').hide();
	$('#close_ranking').hide();

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
	adapt_textarea_height(id_textarea);
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
		success: function ()
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






