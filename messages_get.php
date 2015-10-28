<?php


// INIT
session_start();
header('Content-Type: text/html; charset=utf-8');
include 'connexion_base.php';
include 'other/function_php.php';


// POST DATA
$first_load = $_POST['first_load'];
$mode = $_POST['mode'];
$pseudo = $_POST['pseudo'];


// REMENBER PSEUDO
$_SESSION['pseudo'] = $pseudo;
setcookie("pseudo", $pseudo, time()+3600*24*365, "/");


// RESET MESSAGE ID IF FIRST LOAD OR MISSING SESSION
if (!isset($_SESSION['last_message_id']) || $first_load == 'true')
{
    $_SESSION['last_message_id'] = 0;
}


// SQL TO GET ONLY NEW MESSAGES
if ($mode == 'append')
{
    $sql = $bdd->prepare
    (
        'SELECT id, timestamp, pseudo, text 
        FROM message 
        WHERE id > :last_message_id 
        ORDER BY id DESC 
        LIMIT 1000'
    );
    $sql->bindParam(':last_message_id', $_SESSION['last_message_id']);
}


// SQL TO GET ALL MESSAGES
else if ($mode == 'reload')
{
    $sql = $bdd->prepare
    (
        'SELECT id, timestamp, pseudo, text 
        FROM message 
        ORDER BY id 
        DESC LIMIT 1000'
    );
}


// GET EACH MESSAGE
$compteur = 0;
$sql->execute();
while ($row = $sql->fetch())
{

    // GET MESSAGE INFORMATION
    $message_id = intval($row['id']);
    $pseudo = nl2br(htmlspecialchars($row['pseudo']));
    $timestamp = convertirDate($row['timestamp']);
    $text = nl2br(htmlspecialchars($row['text']));


    // HTML MESSAGE BOX
    ?>
    <div class="row_message">
        <div class="header_message">
            <div class="pseudo_message">
                <?php echo $pseudo;?>
            </div>
            <div class="timestamp_message">
                <?php echo $timestamp;?>
            </div>
        </div>
        <div class="text_message">
            <?php echo $text;?>
        </div>
    </div>
    <?php


    // GET LAST MESSAGE ID
    $compteur += 1;
    if ($compteur == 1)
    {
        $_SESSION['last_message_id'] = $message_id;
    }
    
}
?>


