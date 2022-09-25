<?php
include "connection.php"; //get connection and add header to allow access
$data = false;
// get all user base on user type 
if (isset($_POST["id"])) {
  $id = $_POST["id"];
  $sql = "DELETE from users where id=? ";
  $query = $mysqli->prepare($sql);
  $query->bind_param("s", $id);
  if ($query->execute()) {
    $data = true;
  }
}
echo json_encode($data);
