<?php
include "connection.php";
$done = false;
if (isset($_POST["client_id"]) && isset($_POST["product_id"])) {
  $client_id = $_POST["client_id"];
  $product_id = $_POST["product_id"];
  $query = $mysqli->prepare("SELECT * from  wishlists where client_id=? and product_id=? ");
  $query->bind_param("ii",  $client_id, $product_id);
  if ($query->execute()) {
    $array = $query->get_result();
    $row = $array->fetch_assoc();

    if ($row == null) {
      $query = $mysqli->prepare("INSERT into wishlists (client_id,product_id) VALUES(?,?) ");
      $query->bind_param("ii",  $client_id, $product_id);

      if ($query->execute()) {
        $done = true;
      }
    } else {
      $done = "exists";
    }
  }
}
echo json_encode($done);
