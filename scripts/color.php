<?php
require_once('database.php');

// post language
if (isset($_POST['type']))
{
  $db = new DataBase();
  if ($_POST['type'] == 'new')
  {
echo "Hallo";
    $tbl_data1 = $db->query_get_table('Select name from colors where id='.(int)$_GET['primary']);

    $tbl_data2 = $db->query_get_table('Select name from colors where id='.(int)$_GET['secondary']);

    $tbl_data1 = mysql_real_escape_string($tbl_data1);
    $tbl_data2 = mysql_real_escape_string($tbl_data2);


  //  $sql = "INSERT INTO color (name) VALUES("'.
   // $db->esc_string($tbl_data1).'", "'.
    // $db->esc_string($tbl_data2).'")";
    $db->query($sql);
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

