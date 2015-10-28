<?php


// DECRYPT PASSWORD
function simple_decrypt($text,$salt)
{  
    return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $salt, base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
}


// GET PASSWORD
function getPassword_decrypt()
{

	// GET PASSWORD
	$serverAccess = true;
	include_once 'other/password_chat.php';
	

	// DECRYP
	$salt = 'saI54A1ifeJ3';
	$password = simple_decrypt($password, $salt);


	//RETURN PASSWORD
	return $password;
	
}


try
{

	// DATABASE INFORMATION
	$host = 'localhost';
	$dbname = 'chat';
	$user = 'chat_user';

	/*  DEFAULT PASSWORD */
	$password = 'dg99qJ3qnWW2';
	

	/* ENCRYPTED PASSWORD 
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