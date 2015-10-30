<?php

/* ENCRYPT FUNCTION

$text ='';
$salt ='fsd90832K3j4';

function simple_encrypt($text,$salt)
{  
    return trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
}

function simple_decrypt($text,$salt)
{  
    return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $salt, base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
}




$password = $text;

echo $password;

echo "<br>";

$encrypt = simple_encrypt($password, $salt);

echo $encrypt;

echo "<br>";

$decrypt = simple_decrypt($encrypt, $salt);

echo $decrypt;

echo "<br>";

*/

?>