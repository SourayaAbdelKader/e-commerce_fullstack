<?php
include "connection.php";
$data = [];
if (isset($_POST["id"])) {
  $id = $_POST["id"];
  $sql = "select * from products where id=?";
  $query = $mysqli->prepare($sql);
  $query->bind_param("i", $id);
  if ($query->execute()) {
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
  }
}
echo json_encode($data);
