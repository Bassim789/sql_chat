

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
		$('#input_message').focus();
	}

	// SET PSEUDO COOKIE
	$('#input_pseudo').val(getCookie('pseudo'));

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
	var pseudo = $('#input_pseudo').val();
	var text = $('#input_message').val();
	$('#input_message').val('');
	if (on_desktop())
	{
		$('#input_message').focus();
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


// GET MORE MESSAGES
function get_more_messages()
{
	ajax_get_more_messages();
}

