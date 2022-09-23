<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
if (isset($_POST["client_id"])) {
  $client_id = $_POST["client_id"];

  // first query to get the order_id  of the un checkout cart/order for this client
  $query = $mysqli->prepare("select id from orders where client_id=? and isCheckout=0");
  $query->bind_param("i", $client_id);
  $query->execute();
  $array = $query->get_result();
  $order_id = $array->fetch_assoc()["id"];

  //get all info of products are in this cart
  $query = $mysqli->prepare("select * from order_products o join products p on p.id=o.product_id where o.order_id=?");
  $query->bind_param("i", $order_id);
  if ($query->execute()) {
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
  }
}
echo json_encode($data);
