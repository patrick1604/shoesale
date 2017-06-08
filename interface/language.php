<?php
require_once('database.php');

// post language
if (isset($_POST['type']))
{
  $db = new DataBase();
  if ($_POST['type'] == 'new')
  {
    $sql = 'INSERT INTO language (name) VALUES ("'.$db->esc_string($_POST['name']).'")';
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
    $tbl_data = $db->query_get_table('SELECT * FROM language');
  }
  // get specific language
  else
  {
    $tbl_data = $db->query_get_table('SELECT * FROM language WHERE id='.(int)$_GET['rec']);
  }
  echo json_encode($tbl_data);
}

?>

