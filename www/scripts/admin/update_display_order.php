<?php 

	require("../db_connect.php");

	$active = json_decode(stripslashes($_POST['active']));

	for ($i=0; $i<sizeOf($active); $i++)
	{
		$sql = "UPDATE photos SET display_order = ".($i+1)." WHERE id = ".$active[$i];
		mysql_query($sql);
	}

	$hidden = json_decode(stripslashes($_POST['hidden']));

	for ($i=0; $i<sizeOf($hidden); $i++)
	{
		$sql = "UPDATE photos SET display_order = 0 WHERE id = ".$hidden[$i];
		mysql_query($sql);
	}

?>  