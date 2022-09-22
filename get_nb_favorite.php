<?php
include "connection.php";
$result = 0;
if (isset($_POST["product_id"])) {
  $product_id = $_POST["product_id"];
  $query = $mysqli->prepare("SELECT count(client_id) as views from  favorites where  product_id=?");
  $query->bind_param("i",  $product_id);
  if ($query->execute()) {
    $array = $query->get_result();
    $result = $array->fetch_assoc()["views"];
  }
}
echo json_encode($result);
