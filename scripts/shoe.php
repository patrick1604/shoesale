<?php
require_once('database.php');

if (isset($_POST['type']))
{
  $db = new DataBase();

  // post new episode
  /*if ($_POST['type'] == 'new')
  {
    $sql = 'INSERT INTO shoe (name, label_id, color_id, material_id, type_id, price) VALUES ("'.
            $db->esc_string($_POST['name']).'", '.
            (int)$_POST['label_id'].', '.
            (int)$_POST['color_id'].', '.
            (int)$_POST['material_id'].', '.
            (int)$_POST['type_id'].')';
            (int)$_POST['price'].')';
    $db->query($sql);
    echo 'Neuer Film wurde angelegt';
  }
  // post update episode
 /* if ($_POST['type'] == 'edit')
  {
    $sql = 'UPDATE movie SET '.
            'name="'.$db->esc_string($_POST['name']).'", '.
            'length='.(int)$_POST['length'].', '.
            'format_id='.(int)$_POST['format_id'].', '.
            'genre_id='.(int)$_POST['genre_id'].', '.
            'language_id='.(int)$_POST['language_id'].
            ' WHERE id='.(int)$_POST['id'];
    $db->query($sql);
    echo 'Film wurde aktualisiert';
  }*/
}

if (isset($_GET['rec']))
{
  $db = new DataBase();

  // get all episodes
  if ($_GET['rec'] == 'all' && $db != null)
  {

    $tbl_data = $db->query_get_table('SELECT * FROM shoe');
  }
  // get specific episode
  else
  {
    $tbl_data = $db->query_get_table('SELECT * FROM shoe WHERE id='.(int)$_GET['rec']);
  }

  echo json_encode($tbl_data);
}

?>

