<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
// get all user base on user type 
if (isset($_POST["user_type"])) {
  $user_type = $_POST["user_type"];
  $sql = "select * from users where user_type=? ";
  $query = $mysqli->prepare($sql);
  $query->bind_param("s", $user_type);
  if ($query->execute()) {
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
  }
}
echo json_encode($data);
