<?php
include "connection.php";
$data = [];
$sql = "SELECT * , COUNT(user_id) as views from viewers v 
        join products p on p.id=v.product_id 
        GROUP by product_id order by views DESC LIMIT 5";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

echo json_encode($data);
