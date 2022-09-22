<?php
include "connection.php";
$data = [];
if (isset($_POST["client_id"])) {
  $client_id = $_POST["client_id"];

  // first query to get the order_id  of the un checkout cart
  $query = $mysqli->prepare("select id from orders where client_id=? and isCheckout=0");
  $query->bind_param("i", $client_id);
  $query->execute();
  $array = $query->get_result();
  $order_id = $array->fetch_assoc()["id"];
  

  $query = $mysqli->prepare("select * from order_products where order_id=?");
  $query->bind_param("i", $order_id);
  if ($query->execute()) {
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
  }
}
echo json_encode($data);
