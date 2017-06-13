<?php
require_once('database.php');

// post language
if (isset($_POST['type']))
{
  $db = new DataBase();
  if ($_POST['type'] == 'new')
  {

   echo "Hallo";


  //TODO: get both strings and combine them. add to color table

    $tbl_data1 = $db->query_get_table('Select name from colors where id='.$db->esc_string((int)$_POST['primary']));

    $tbl_data2 = $db->query_get_table('Select name from colors where id='.$db->esc_string((int)$_POST['secondary']));


    $stringnew = json_encode($tbl_data1[0]['name'],JSON_NUMERIC_CHECK);

    $stringnew .= json_encode($tbl_data2[0]['name'],JSON_NUMERIC_CHECK);

    echo $stringnew;

    //$sql = "INSERT INTO color (name) VALUES(".$stringnew.")";

    $db->query($sql);
    echo 'Neue Sprache wurde angelegt';
    echo json_encode($tbl_data1[0]['name']);
  }
}

if (isset($_GET['rec']))
{
  $db = new DataBase();

  // get all languages
  if ($_GET['rec'] === 'all')
  {
    $tbl_data = $db->query_get_table('SELECT * FROM color');
  }
  // get specific language
  else
  {
    $tbl_data = $db->query_get_table('SELECT * FROM color WHERE id='.(int)$_GET['rec']);
  }
  echo json_encode($tbl_data);
}

?>

