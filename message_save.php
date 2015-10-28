<?php


// CONNEXION TO DATABASE
include 'connexion_base.php';


// GET POST DATA
$pseudo = $_POST['pseudo'];
$text = $_POST['text'];


// SQL INSERT NEW MESSAGE
$sql = $bdd->prepare
(
	'INSERT INTO message 
	(pseudo, text) 
	VALUES
	(:pseudo, :text)'
);


// BIND ARGUMENT
$sql->bindParam(':pseudo', $pseudo);
$sql->bindParam(':text', $text);


// EXECUTE
$sql->execute();


?>