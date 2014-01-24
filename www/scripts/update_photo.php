<?php

	require("db_connect.php");

	$title_display = htmlspecialchars(trim(preg_replace('/\s+/', ' ', $_GET["title_display"])), ENT_QUOTES);
	$page_id = htmlspecialchars(trim(preg_replace('/\s+/', ' ', $_GET["page_id"])), ENT_QUOTES);


	// SAVE NEW RECORD (id = -1) or UPDATE

	if ($_GET["id"] == -1) 
	{
		$SQL = "INSERT INTO photos (title_display,page_id,title_alpha,cover,modified,portrait) VALUES ('";
		$SQL = $SQL.$title_display."','";
		$SQL = $SQL.$page_id."',";
		$SQL = $SQL.$_GET["title_alpha"].",";
		$SQL = $SQL.$_GET["cover"].",";
		$SQL = $SQL.CURRENT_TIMESTAMP.",";
		$SQL = $SQL.$_GET["portrait"];
		$SQL = $SQL.");";
	}
	else {
		$SQL = "UPDATE photos SET ";
		$SQL = $SQL."title_display = \"".$title_display."\", ";
		$SQL = $SQL."page_id = \"".$page_id."\", ";
		$SQL = $SQL."title_alpha = ".$_GET["title_alpha"].", ";
		$SQL = $SQL."cover = ".$_GET["cover"].", ";
		$SQL = $SQL."modified = ".CURRENT_TIMESTAMP." ";
		$SQL = $SQL."WHERE id = ".$_GET["id"];
	}

	echo $SQL;
	$result = mysql_query($SQL) or die(mysql_error());    


	// move new photos from temp folder
	if ($_GET["id"] == -1)
	{
		$new_id = mysql_insert_id();
		
		rename("../img/photos/tmp/tmp_photo_2000.jpg", "../img/photos/".$new_id."-2000.jpg");
		rename("../img/photos/tmp/tmp_photo_1500.jpg", "../img/photos/".$new_id."-1500.jpg");
		rename("../img/photos/tmp/tmp_photo_1000.jpg", "../img/photos/".$new_id."-1000.jpg");
		rename("../img/photos/tmp/tmp_photo_500.jpg", "../img/photos/".$new_id."-500.jpg");
	}


	// echo "success";
	mysql_close($db_handle);

?>