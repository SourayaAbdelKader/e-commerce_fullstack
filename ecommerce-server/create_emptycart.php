<?php
include("connection.php");

$client_id = $_POST['client_id'];
$total = 0;
$isCheckout = 0;
$checkout_date = '';

$query = $mysqli->prepare("INSERT INTO orders(client_id, total, isCheckout, checkout_date) VALUE (?,?,?,?)");
$query->bind_param('ssss', $client_id, $total, $isCheckout, $checkout_date); //change to ?,? to strings vars
$query->execute();
$last_id = $mysqli->insert_id;

$response = [];
$response['success'] = true;

echo json_encode($last_id);
?>
