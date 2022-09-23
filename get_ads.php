<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
$sql = "select * ,a.description as ads_description from advertisements a join products p on p.id=a.product_id";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  //will get all ads with more info of the product that have this ads
  $result = $query->get_result();
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}
echo json_encode($data);
