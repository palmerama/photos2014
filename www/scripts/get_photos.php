<?php

  require("db_connect.php");
  
  $json = array();
  $json['covers'] = array();
  $json['photos'] = array();

  $SQL = "SELECT * FROM photos";
  $result = mysql_query($SQL) or die(mysql_error());    

  while ( $db_field = mysql_fetch_assoc($result) )
  {
    // add to site list?
    if ($db_field['show_on_site'] == 1) 
    {
      $record = array(
        'id'=>$db_field['id'],
        'page_id'=>$db_field['page_id'],
        'title_display'=>$db_field['title_display'],
        'title_alpha'=>$db_field['title_alpha'],
        'potrait'=>$db_field['portrait']
      );

      array_push($json['photos'], $record);
    }

    // add to covers list?
    if ($db_field['cover'] == 1) 
    {
      $record = array(
        'id'=>$db_field['id'],
        'title_alpha'=>$db_field['title_alpha']
      );

      array_push($json['covers'], $record);
    }
  }


  // return
  header('Content-Type: application/json');
  echo json_encode($json);

  mysql_close($db_handle);

?>