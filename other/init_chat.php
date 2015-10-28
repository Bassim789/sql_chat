<?php

// START SESSION
session_start();


// DEFAULT EMPTY PSEUDO
$pseudo = '';


// GET COOKIE
if (isset($_COOKIE['pseudo']))
{
	$pseudo = $_COOKIE['pseudo'];
}


// GET SESSION
if (isset($_SESSION['pseudo']))
{
	$pseudo = $_SESSION['pseudo'];
}


?>