<?php

  require("db_connect.php");
  
  $json = array();
  $json['covers'] = array();
  $json['photos'] = array();
  $json['hidden'] = array();


  // GET PHOTOS IN SEQUENCE

  $SQL = "SELECT * FROM photos WHERE display_order > 0 ORDER BY display_order ASC";

  $result = mysql_query($SQL) or die(mysql_error());    

  while ( $db_field = mysql_fetch_assoc($result) )
  {
    // add to site list?
    $record = array(
    'id'=>$db_field['id'],
      'page_id'=>$db_field['page_id'],
      'title_display'=>$db_field['title_display'],
      'title_alpha'=>$db_field['title_alpha'],
      'title_colour'=>$db_field['title_colour'],
      'portrait'=>$db_field['portrait']
    );

    array_push($json['photos'], $record);
  }


  // GET PHOTOS *NOT* IN SEQUENCE

  $SQL = "SELECT * FROM photos WHERE display_order = 0 ORDER BY id ASC";

  $result = mysql_query($SQL) or die(mysql_error());    

  while ( $db_field = mysql_fetch_assoc($result) )
  {
    // add to site list?
    $record = array(
    'id'=>$db_field['id'],
      'page_id'=>$db_field['page_id'],
      'title_display'=>$db_field['title_display'],
      'title_alpha'=>$db_field['title_alpha'],
      'title_colour'=>$db_field['title_colour'],
      'portrait'=>$db_field['portrait']
    );

    array_push($json['hidden'], $record);
  }


  // GET COVERS

  $SQL = "SELECT * FROM photos WHERE cover = 1";

  $result = mysql_query($SQL) or die(mysql_error());    

  while ( $db_field = mysql_fetch_assoc($result) )
  {
    $record = array(
      'id'=>$db_field['id'],
      'page_id'=>$db_field['page_id'],
      'title_alpha'=>$db_field['title_alpha'],
      'title_colour'=>$db_field['title_colour'],
      'portrait'=>$db_field['portrait']
    );

    array_push($json['covers'], $record);
  }



  // RETURN

  header('Content-Type: application/json');
  echo json_encode($json);

  mysql_close($db_handle);

?>