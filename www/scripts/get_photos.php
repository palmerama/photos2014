<?php

  require("db_connect.php");

  $SQL = "SELECT * FROM photos WHERE show_on_site = 1";
  $json = array();


  // GET THE PHOTOS

  $result = mysql_query($SQL) or die(mysql_error());    
  
  while ( $db_field = mysql_fetch_assoc($result) )
  {
    $record = array(
      'id'=>$db_field['id'],
      'page_id'=>$db_field['page_id'],
      'filename'=>$db_field['filename'],
      'title_display'=>$db_field['title_display'],
      'title_alpha'=>$db_field['title_alpha']
    );
    
    array_push($json, $record);
  }
  
  // RESULT

  header('Content-Type: application/json');
  echo json_encode($json);

  mysql_close($db_handle);

?>