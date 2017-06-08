<?php
require_once('database.php');

// post format
if (isset($_POST['type']))
{
  $db = new DataBase();
  if ($_POST['type'] == 'new')
  {
    $sql = 'INSERT INTO format (name) VALUES ("'.$db->esc_string($_POST['name']).'")';
    $db->query($sql);
    echo 'Neues Dateiformat wurde angelegt';
  }
}

if (isset($_GET['rec']))
{
  $db = new DataBase();

  // get all formats
  if ($_GET['rec'] === 'all')
  {
    $tbl_data = $db->query_get_table('SELECT * FROM format');
  }
  // get specific format
  else
  {
    $tbl_data = $db->query_get_table('SELECT * FROM format WHERE id='.(int)$_GET['rec']);
  }
  echo json_encode($tbl_data);
}

?>

