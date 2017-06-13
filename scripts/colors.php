<?php
require_once('database.php');

if (isset($_GET['rec']))
{
  $db = new DataBase();

  if ($_GET['rec'] === 'all')
  {
    $tbl_data = $db->query_get_table('SELECT * FROM colors');
  }

  echo json_encode($tbl_data);
}

?>

