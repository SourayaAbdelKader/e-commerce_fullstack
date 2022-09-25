<?php
include "connection.php"; //get connection and add header to allow access
$done = false; //will return it depending on result of the query
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$total = $data["total"];
$checkout_date = $data["checkout_date"];
$client_id = $data["client_id"];
echo $total, $checkout_date, $client_id;
//update order/cart to be like checkout by flag in the table
$sql = "UPDATE orders set total=? , checkout_date=? , isCheckout=1 where client_id=? and isCheckout=0";
$query = $mysqli->prepare($sql);
$query->bind_param("isi", $total, $checkout_date, $client_id);
// every clint must have 1 empty uncheckout card to add order_products
$query2 = $mysqli->prepare("INSERT into orders (client_id,total,isCheckout,checkout_date) values(?,0,0,'0')");
$query2->bind_param("i", $client_id);
if ($query->execute() && $query2->execute()) {

    $done = true;
}
echo json_encode($done);
