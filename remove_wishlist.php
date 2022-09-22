<?php
include "connection.php";
$done = false;
if (isset($_POST["client_id"]) && isset($_POST["product_id"])) {
  $client_id = $_POST["client_id"];
  $product_id = $_POST["product_id"];
  $query = $mysqli->prepare("DELETE from  wishlists where client_id= ? and product_id=? ");
  $query->bind_param("ii",  $client_id, $product_id);

  if ($query->execute()) {
    $done = true;
  }
}
echo json_encode($done);
