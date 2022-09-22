<?php
include "connection.php";
$data = [];
if (isset($_POST["client_id"])) {
  $id = $_POST["client_id"];
  $sql = "select * from favorites f join products p on p.id=f.product_id where client_id=? ";
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
