<?php

	$username="root";
	$password="root";
	$db="palmerama_photos";
	$host="localhost";

	$db_handle = mysql_connect($host, $username, $password) or die(mysql_error());
	mysql_select_db($db) or die(mysql_error());

?>