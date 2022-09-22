<?php
include "connection.php";
$done = false;
if (isset($_POST["user_id"]) && isset($_POST["product_id"])) {
  $user_id = $_POST["user_id"];
  $product_id = $_POST["product_id"];
  $query = $mysqli->prepare("SELECT * from  viewers where user_id=? and product_id=? ");
  $query->bind_param("ii",  $user_id, $product_id);
  if ($query->execute()) {
    $array = $query->get_result();
    $row = $array->fetch_assoc();

    if ($row == null) {
      $query = $mysqli->prepare("INSERT into viewers (user_id,product_id) VALUES(?,?) ");
      $query->bind_param("ii",  $user_id, $product_id);

      if ($query->execute()) {
        $done = true;
      }
    } else {
      $done = "exists";
    }
  }
}
echo json_encode($done);
