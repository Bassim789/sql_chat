<?php

// SET TIMEZONE TO PARIS
date_default_timezone_set('Europe/Paris');


// CONVERT TIMESTAMP TO TIME AGO
function convertirDate($timestamp_string)
{

    // GET DATA FROM TIMESTAMP STRING
    $annee=substr($timestamp_string,0,4);
    $mois=substr($timestamp_string,5,2);
    $jour=substr($timestamp_string,8,2);
    $heures=substr($timestamp_string,11,2);
    $minutes=substr($timestamp_string,14,2);
    $secondes=substr($timestamp_string,17,2);


    // CONVERT DATA TO TIMESTAMP SECONDE
    $timestamp = mktime($heures, $minutes, $secondes, $mois, $jour, $annee);

    // DIFFERENCE BETWEEN NOW AND TIMESTAMP
    $second = time() - $timestamp;


    // CONVERT SECONDE TO S, MIN, H, DAY, MONTH
    if ($second < 1)
    {
        $temps = "Now";
    }
    elseif ($second < 60)
    {
        $temps = $second.' s';
    }
    elseif($second < 3600)
    {
        $temps = (floor($second/60)).' min';
    }
    elseif($second < (3600*24))
    {
        $temps = (floor($second/60/60)).' h';
    }
    elseif($second < (3600*24*365))
    {
        $temps = (floor($second/60/60/24)).' day';
    }
    elseif($second < (3600*24*365*30))
    {
        $temps = (floor($second/60/60/24/30)).' month';
    }
    if ($timestamp_string == "")
    {
        $temps = "";
    }

    return $temps;
}

?>