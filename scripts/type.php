<?php
require_once('database.php');

// post genre
if (isset($_POST['type']))
{
  $db = new DataBase();
  if ($_POST['type'] == 'new')
  {
    $sql = 'INSERT INTO type (name) VALUES ("'.$db->esc_string($_POST['name']).'")';
    $db->query($sql);
    echo 'Neues Genre wurde angelegt';
  }
}

if (isset($_GET['rec']))
{
  $db = new DataBase();

  // get all genres
  if ($_GET['rec'] === 'all')
  {
    $tbl_data = $db->query_get_table('SELECT * FROM type');
  }
  // get specific genre
  else
  {
    $tbl_data = $db->query_get_table('SELECT * FROM type WHERE id='.(int)$_GET['rec']);
  }
  echo json_encode($tbl_data);
}

?>

