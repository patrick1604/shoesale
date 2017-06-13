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

  //  $tbl_data1 = $db->query_get_table('Select name from colors where id='.$db->esc_string((int)$_POST['primary']));

 //   $tbl_data2 = $db->query_get_table('Select name from colors where id='.$db->esc_string((int)$_POST['secondary']));

  //  $tbl_data1 = $tbl_data1;
  //  $tbl_data2 = $tbl_data2;

   // echo $tbl_data1;
  //  echo $tbl_data2;


  //  $sql = "INSERT INTO color (name) VALUES(".'$tbl_data1.'", "'.$tbl_data2.'")";

  //  $db->query($sql);
    echo 'Neue Sprache wurde angelegt';
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

