<?php


// CONNECT
include 'connexion_base.php';


// POST DATA
$stat_div = $_POST['stat_div'];


// SET ORDER
if ($stat_div == '#nb_pseudo')
{
	$order = "pseudo ASC";
}
else if ($stat_div == '#nb_message')
{
	$order = 'nb_message DESC';
}
else if ($stat_div == '#nb_char')
{
	$order = 'nb_char DESC';
}


// SQL TO GET TOTAL USER STAT
$sql = $bdd->prepare
(
	'SELECT pseudo, nb_message, nb_char 
	FROM user 
	ORDER BY '.$order
);


// EXECUTE
$sql->execute();


// GET DATA
$compteur = 0;
while ($row = $sql->fetch())
{
	$compteur += 1;

	// PRINT EACH ROW
	?>
	<div class="ranking_row">
		<div class="ranking_cell ranking_pseudo">
			<?php echo $compteur;?>) <?php echo htmlspecialchars($row['pseudo']);?>
		</div>
		<div class="ranking_cell">
			<?php echo $row['nb_message'];?>
		</div>
		<div class="ranking_cell">
			<?php echo $row['nb_char'];?>
		</div>
	</div>
	<?php
}


?>