<?php
include "connection.php"; //get connection and add header to allow access
$done = false;//will return it depending on result of the query  
if (isset($_POST["client_id"]) && isset($_POST["product_id"])) {
  $client_id = $_POST["client_id"];
  $product_id = $_POST["product_id"];
  //check if this product exists for this client to avoid adding duplicate data
  $query = $mysqli->prepare("SELECT * from  wishlists where client_id=? and product_id=? ");
  $query->bind_param("ii",  $client_id, $product_id);
  if ($query->execute()) {
    $array = $query->get_result();
    $row = $array->fetch_assoc();
    //if not exists just add it to the table
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
