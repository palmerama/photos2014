<?php

  require("db_connect.php");
  
  $json = array();
  $json['photos'] = array();


  // GET PHOTOS IN SEQUENCE

  $SQL = "SELECT * FROM photos where id = ".$_GET['id'];

  $result = mysql_query($SQL) or die(mysql_error());    

  while ( $db_field = mysql_fetch_assoc($result) )
  {
    // add to site list?
    $record = array(
      'id'=>$db_field['id'],
      'page_id'=>htmlspecialchars_decode($db_field['page_id'], ENT_QUOTES),
      'title_display'=>htmlspecialchars_decode($db_field['title_display'], ENT_QUOTES),
      'title_alpha'=>$db_field['title_alpha'],
      'portrait'=>$db_field['portrait'],
      'cover'=>$db_field['cover']
    );

    array_push($json['photos'], $record);
  }



  // RETURN

  header('Content-Type: application/json');
  echo json_encode($json);

  mysql_close($db_handle);

?>