<?php

// INIT
session_start();
include 'connexion_base.php';


// IS FIRST LOAD
$first_load = $_POST['first_load'];


// RESET MESSAGE ID IF FIRST LOAD
if ($first_load == 'true')
{
	$_SESSION['last_message_id'] = 0;
}


// SQL TO GET ONLY NEW MESSAGES (max 30, order asc)
$sql = $bdd->prepare
(
	'SELECT messages.* FROM
	(
		SELECT message.id AS id, 
			message.timestamp AS timestamp, 
			message.text AS text, 
			user.pseudo AS pseudo
		FROM message
		INNER JOIN user ON message.pseudo_id = user.id
		WHERE message.id > :last_message_id 
		ORDER BY message.id DESC
		LIMIT 30
	) 
	messages ORDER BY messages.id ASC'
);
$sql->bindParam(':last_message_id', $_SESSION['last_message_id']);



// GET EACH MESSAGE
$is_messages = false;
$sql->execute();
while ($row = $sql->fetch())
{

	// GET MESSAGE INFORMATION
	$message_id = intval($row['id']);
	$pseudo = nl2br(htmlspecialchars($row['pseudo']));
	$timestamp = $row['timestamp'];
	$timestamp_two_lines = substr($timestamp, 0, 10).'<br>'.substr($timestamp, 10);
	$text = nl2br(htmlspecialchars($row['text']));


	// HTML MESSAGE BOX
	?>
	<div class="row_message">
		<div class="header_message">
			<div class="pseudo_message">
				<?php echo $pseudo;?>
			</div>
			<div class="timestamp_message">
				<?php echo $timestamp_two_lines;?>
			</div>
		</div>
		<div class="text_message">
			<?php echo $text;?>
		</div>
	</div>
	<div class="row_message_separator">
		<div class="bottom_triangle"></div>
	</div>
	<?php

	// IS MESSAGES
	$is_messages = true;
	
}

// GET LAST MESSAGE ID
if ($is_messages)
{
	$_SESSION['last_message_id'] = $message_id;
}


?>


