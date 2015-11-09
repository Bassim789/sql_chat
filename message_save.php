<?php


// CONNEXION TO DATABASE
include 'connexion_base.php';


// GET POST DATA
$pseudo = $_POST['pseudo'];
$text = $_POST['text'];


// SET NB_CHAR
$nb_char = strlen($text);



// DEFAULT NOT IN DATABASE
$pseudo_id = 'not_in_database';



// GET ID IF PSEUDO ALREADY EXIST
$sql = $bdd->prepare
(
	'SELECT id 
	FROM user
	WHERE pseudo = :pseudo'
);


// BIND ARGUMENT AND EXECUTE
$sql->bindParam(':pseudo', $pseudo);
$sql->execute();


// GET ID
while ($row = $sql->fetch())
{

	// GET PSEUDO ID
	$pseudo_id = $row['id'];

}


// IF NOT IN DATABASE
if ($pseudo_id == 'not_in_database')
{
	// SQL INSERT NEW PSEUDO
	$sql = $bdd->prepare
	(
		'INSERT INTO user 
		(pseudo)
		VALUES
		(:pseudo)'
	);

	// BIND ARGUMENT AND EXECUTE
	$sql->bindParam(':pseudo', $pseudo);
	$sql->execute();

	// GET PSEUDO ID
	$pseudo_id = $bdd->lastInsertId();

}


// INCREMENTE NB_MESSAGE AND NB_CHAR
$sql = $bdd->prepare
(
	'UPDATE user 
	SET nb_message = nb_message + 1,
		nb_char = nb_char + :nb_char
	WHERE id = :pseudo_id'
);


// BIND ARGUMENT AND EXECUTE
$sql->bindParam(':pseudo_id', $pseudo_id);
$sql->bindParam(':nb_char', $nb_char);
$sql->execute();


// INSERT NEW MESSAGE
$sql = $bdd->prepare
(
	'INSERT INTO message 
	(pseudo_id, text) 
	VALUES
	(:pseudo_id, :text)'
);


// BIND ARGUMENT AND EXECUTE
$sql->bindParam(':pseudo_id', $pseudo_id);
$sql->bindParam(':text', $text);
$sql->execute();

?>