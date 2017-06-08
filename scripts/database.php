<?php

class DataBase
{

  private $db_con;

  // disconnect from database
  function __destruct()
  {
    if (is_resource($this->db_con))
    {
      mysql_close($this->db_con);
    }
  }

  // connect to database
  function __construct()
  {
    $db_host      = 'localhost';
    $db_database  = 'shoesale';
    $db_user      = 'root';
    $db_password  = '';
    $connection = mysql_connect($db_host, $db_user, $db_password);
    mysql_select_db($db_database, $connection);
    $this->db_con = $connection;
  }

  // wrapper for the escape string
  function esc_string($str)
  {
    return mysql_real_escape_string($str);
  }

  // standard mysql query
  function query($str)
  {
    $result = mysql_query($str, $this->db_con);
    if (!$result)
    {
      echo ("Error (DataBase)\r\nQuery: ".$str.
           "\r\nError:".mysql_error($this->db_con));
    }
    return $result;
  }

  // get data as array of name-value-pairs
  function query_get_table($str)
  {
    $result = $this->query($str);
    if ($result)
    {
      $table = array();
      while ($row = mysql_fetch_array($result, MYSQL_ASSOC))
      {
        array_push($table, $row);
      }
      if (is_resource($result))
      {
        mysql_free_result($result);
      }
      return $table;
    }
    return null;
  }

}

?>
