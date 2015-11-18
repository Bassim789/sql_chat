<!DOCTYPE html>
<html>
	<head>
		<title>SQL Chat</title>
		<link rel="shortcut icon" href="other/shortcut_icon.png">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
		<meta charset="utf-8">
		<link rel="stylesheet" id="x-font-custom-css" href="other/lato_font.css" type="text/css" media="all">
		<link rel="stylesheet" href="css.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script> 
		<script src="client_functions.js"></script>
		<script src="client_functions_special.js"></script>
	</head>
	<body>
		<div id="header_fixed">
			<div id="main_title">
				SQL Chat
			</div>
			<div class="body_inner">
				<div id="stat">
					<div class="stat_div" id="nb_pseudo"> <!-- nb_pseudo --> <br>users</div>
					<div class="stat_div" id="nb_message"> <!-- nb_message --> <br>msgs</div>
					<div class="stat_div" id="nb_char"> <!-- nb_char --> <br>chars</div>
				</div>
				<div id="close_ranking"></div>
			</div>
		</div>
		<div class="body_inner">
			<div id="ranking">
				<!--
				each ranks
				-->
			</div>
			<div id="message_list">
				<!--
				each messages
				-->
			</div>
			<div id="input_box">
				<input class="input_base" id="input_pseudo" type="text" placeholder="Pseudo" maxlength="33">
				<div class="btn" id="btn_send"> > </div>
				<br>
				<textarea class="input_base" id="input_message" placeholder="Message" maxlenght="9999"></textarea>
			</div>
		</div>
		<div id="background"></div>
		<script src="serveur_functions.js"></script>
		<script src="event.js"></script>
	</body>
</html>