<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
//get all products we have 
$sql = "select * from products";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}
echo json_encode($data);
