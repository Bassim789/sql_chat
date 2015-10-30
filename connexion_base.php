<?php

try
{

	// DATABASE INFORMATION
	$host = 'localhost';
	$dbname = 'chat';
	$user = 'chat_user';
	$password = 'faOFS43Ot';


	/* ENCRYPTED PASSWORD (OPTIONAL) 
	include_once 'other/get_passowrd_decrypt.php';
	$password = getPassword_decrypt();
	*/


	// CONNEXION
	global $bdd;
	$bdd = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8', $user, $password);

}


// ERROR
catch (PDOException $e)
{
	print "Erreur !: " . $e->getMessage() . "<br/>";
	die();
}


?>