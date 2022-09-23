<?php
include "connection.php"; //get connection and add header to allow access
$result = 0;
if (isset($_POST["product_id"])) {
  $product_id = $_POST["product_id"];
  //get number of likes for a certain product
  $query = $mysqli->prepare("SELECT count(client_id) as fav from  favorites where  product_id=?");
  $query->bind_param("i",  $product_id);
  if ($query->execute()) {
    $array = $query->get_result();
    $result = $array->fetch_assoc()["fav"];
  }
}
echo json_encode($result);
