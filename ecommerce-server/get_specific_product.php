<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
if (isset($_POST["id"])) {
  $id = $_POST["id"];
  // search for a product by id //get specific product 
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
