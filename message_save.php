<?php


// CONNEXION TO DATABASE
include 'connexion_base.php';


// GET POST DATA AND SET NB_CHAR
$pseudo = trim($_POST['pseudo']);
$text = $_POST['text'];
$nb_char = strlen($text);


// INCREMENTE NB_MESSAGE AND NB_CHAR
$sql = $bdd->prepare
(
	'UPDATE user 
	SET nb_message = nb_message + 1,
		nb_char = nb_char + :nb_char,
		id = LAST_INSERT_ID(id)
	WHERE pseudo = :pseudo'
);
$sql->bindParam(':pseudo', $pseudo);
$sql->bindParam(':nb_char', $nb_char);
$sql->execute();
$pseudo_id = $bdd->lastInsertId();


// IF NOT IN DATABASE INSERT NEW USER
if ($pseudo_id == 0)
{
	$sql = $bdd->prepare
	(
		'INSERT INTO user 
		(pseudo, nb_message, nb_char)
		VALUES
		(:pseudo, 1, :nb_char)'
	);
	$sql->bindParam(':pseudo', $pseudo);
	$sql->bindParam(':nb_char', $nb_char);
	$sql->execute();
	$pseudo_id = $bdd->lastInsertId();
}


// INSERT NEW MESSAGE
$sql = $bdd->prepare
(
	'INSERT INTO message 
	(pseudo_id, text) 
	VALUES
	(:pseudo_id, :text)'
);
$sql->bindParam(':pseudo_id', $pseudo_id);
$sql->bindParam(':text', $text);
$sql->execute();


?>