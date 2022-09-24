<?php
include "connection.php";

    $client_id = $_POST['client_id']; //to retrieve the order_id
    $product_id = $_POST['product_id']; //to update this product with same order_id
    $new_quantity = $_POST['new_quantity']; //to update the quantity

    echo json_encode($client_id);
    // first query to get the order_id of the saved cart of this user(client):
    $query = $mysqli->prepare('SELECT id FROM orders WHERE client_id=? and isCheckout=0'); //checkout:0/false to get only unpaid/unfinished order
    $query->bind_param('i', $client_id);
    $query->execute();
    $array = $query->get_result();
    $order_id = $array->fetch_assoc()['id'];
    //if quantity sent == 0/remove item from the whole order: (used negative number to avoid conflict with 0 or null in PHP)
    if ($new_quantity < 0) {
        $query = $mysqli->prepare("DELETE FROM order_products WHERE product_id=? AND order_id=?");
        $query->bind_param('ii', $product_id, $order_id);
        $query->execute();
        $response = [];
        $response['success'] = true;
    }
    // update the info of new quantity product in (order_products):
    else {
        $query = $mysqli->prepare('UPDATE order_products SET quantity=? WHERE product_id=? AND order_id=?');
        $query->bind_param('iii', $new_quantity, $product_id, $order_id);
        $query->execute();
        $response = [];
        $response['success'] = true;
    }
echo json_encode($response);
