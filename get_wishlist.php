<?php
include "connection.php";  //get connection and add header to allow access

$data = [];
if (isset($_POST["client_id"])) {
  $id = $_POST["client_id"];
  //get all products in wishlists for a client
  $sql = "select * from wishlists w  join products p on p.id=w.product_id where w.client_id=? ";
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
