<?php


// CONNECT
include 'connexion_base.php';


// SQL TO GET TOTAL USER STAT
$sql = $bdd->prepare
(
	'SELECT COUNT(pseudo) AS total_pseudo, 
		SUM(nb_message) AS total_message, 
		SUM(nb_char) AS total_char
	FROM user'
);


// EXECUTE
$sql->execute();

// GET DATA
while ($row = $sql->fetch())
{
	$total_pseudo = $row['total_pseudo'];
	$total_message = $row['total_message'];
	$total_char = $row['total_char'];
}


// SEND DATA
echo $total_pseudo.";".$total_message.";".$total_char;


?>