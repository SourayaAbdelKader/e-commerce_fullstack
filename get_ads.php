<?php
include "connection.php";
$data = [];
$sql = "select * ,a.description as ads_description from advertisements a join products p on p.id=a.product_id";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}
echo json_encode($data);
