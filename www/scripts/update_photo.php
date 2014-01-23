<?php

  require("db_connect.php");

  // GET PHOTOS IN SEQUENCE

  $title_display = htmlspecialchars(trim(preg_replace('/\s+/', ' ', $_GET["title_display"])), ENT_QUOTES);
  $page_id = htmlspecialchars(trim(preg_replace('/\s+/', ' ', $_GET["page_id"])), ENT_QUOTES);
  
  $SQL = "UPDATE photos SET title_display = \"".$title_display."\", page_id = \"".$page_id."\", title_alpha = ".$_GET["title_alpha"].", cover = ".$_GET["cover"]." WHERE id = ".$_GET["id"];
  $result = mysql_query($SQL) or die(mysql_error());    


  echo $SQL;
  mysql_close($db_handle);

?>