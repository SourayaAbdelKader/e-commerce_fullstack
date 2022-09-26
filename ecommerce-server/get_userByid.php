<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
// get all user base on user type 
if (isset($_POST["id"])) {
  $id = $_POST["id"];
  $sql = "select * from users where id=? ";
  $query = $mysqli->prepare($sql);
  $query->bind_param("s", $id);
  if ($query->execute()) {
    $result = $query->get_result();
    $data = $result->fetch_assoc();
  }
}
echo json_encode($data);
