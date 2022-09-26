<?php
include "connection.php"; //get connection and add header to allow access
$result = false;
if (
  isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["phone_number"])
  && isset($_POST["bio"]) && isset($_POST["shop_location"])
) {
  $seller_id = $_POST["id"];
  $name = $_POST["name"];
  $bio = $_POST["bio"];
  $shop_location = $_POST["shop_location"];
  $phone_number = $_POST["phone_number"];
  //update seller info
  $query = $mysqli->prepare("UPDATE users set name=?  , phone_number=? , bio=? , shop_location=?   where id=? and user_type='seller'");
  $query->bind_param("sssss", $name, $phone_number, $bio, $shop_location, $seller_id);
  if ($query->execute()) {
    $result = true;
  }
}
echo json_encode($result);
