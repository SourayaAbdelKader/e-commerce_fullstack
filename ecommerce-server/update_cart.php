<?php
include "connection.php";

if (isset($_POST["client_id"]) and $_POST['product_id'] and $_POST['new_quantity']) {
    $client_id = $_POST['client_id']; //to retrieve the order_id
    $product_id = $_POST['product_id']; //to update this product with same order_id
    $new_quantity = $_POST['new_quantity']; //to update the quantity

    // first query to get the order_id of the saved cart of this user(client):
    $query = $mysqli->prepare('SELECT id FROM orders WHERE id=? and isCheckout=0'); //checkout:0/false to get only unpaid/unfinished order
    $query->bind_param('i', $client_id);
    $query->execute();
    $array = $query->get_result();
    $order_id = $array->fetch_assoc()['id'];

    // update the info of new quantity product in (order_products):
    $query = $mysqli->prepare('UPDATE order_products SET quantity=? WHERE product_id=? AND order_id=?');
    $query->bind_param('iii', $new_quantity, $product_id, $order_id);
    $query->execute();
    $response = [];
    $response['success'] = true;
}

echo json_encode($response);
