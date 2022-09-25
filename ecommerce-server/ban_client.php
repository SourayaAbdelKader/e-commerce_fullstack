<?php
include "connection.php"; //get connection and add header to allow access
$result = false;
if (isset($_POST["id"])) {
  $client_id = $_POST["id"];
  //ban user
  $query = $mysqli->prepare("UPDATE users set  access=0 where id=?");
  $query->bind_param("i",  $client_id);
  if ($query->execute()) {
    $result = true;
  }
}
echo json_encode($result);
