<?php
include "connection.php"; //get connection and add header to allow access
$done = false;//will return it depending on result of the query  
if (isset($_POST["client_id"]) && isset($_POST["product_id"]) && isset($_POST["quantity"])) {
  $client_id = $_POST["client_id"];
  $product_id = $_POST["product_id"];
  $quantity = $_POST["quantity"];
  // first query to get the order_id of the un checkout cart
  $query = $mysqli->prepare("select id from orders where client_id=? and isCheckout=0");
  $query->bind_param("i", $client_id);
  $query->execute();
  $array = $query->get_result();
  $order_id = $array->fetch_assoc()["id"];

  // 2nd check if this product exist in this cart
  $query = $mysqli->prepare("select quantity from order_products where product_id=? and order_id=? ");
  $query->bind_param("ii", $product_id, $order_id);
  $query->execute();
  $array = $query->get_result();
  $old_quantity = $array->fetch_assoc();

  // if exist jsut update the quantity
  if ($old_quantity != null) {
    $new_quantity = $old_quantity["quantity"] + $quantity;
    $query = $mysqli->prepare("UPDATE order_products set quantity=? where order_id=? and product_id=?");
    $query->bind_param("iii", $new_quantity, $order_id, $product_id);
    $query->execute();
    $done = true;
  } else {
    //else add this product to the cart 
    $query = $mysqli->prepare("INSERT into order_products (order_id,product_id,quantity) VALUES(?,?,?)");
    $query->bind_param("iii", $order_id, $product_id, $quantity,);
    $query->execute();
    $done = true;
  }
}
echo json_encode($done);
