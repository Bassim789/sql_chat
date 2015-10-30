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
	</head>
	<body>
		<div id="main_title">
			SQL Chat
		</div>
		<div id="body_inner">
			<input class="input_base" id="input_pseudo" type="text" placeholder="Pseudo">
			<br>
			<textarea class="input_base" id="input_message" placeholder="Message" rows="2"></textarea>
			<div class="btn" id="btn_send">Send</div>
			<div id="message_list"></div>
		</div>
		<script src="js.js"></script>
	</body>
</html>