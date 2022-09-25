<?php
include "connection.php";

$product_id = $_POST['product_id'];
$sql = "SELECT P.id product_id,P.title product_title, P.description product_description, P.price product_price, P.main_image product_image, P.image1 product_image1, P.image2 product_image2, P.condition product_condition, C.name categorie_name,  U.id seller_id, U.bio seller_description, U.shop_location seller_location FROM products P,categories C,users U WHERE P.id=? AND P.categorie_id=C.id AND C.seller_id=U.id";
$query = $mysqli->prepare($sql);
$query->bind_param('i', $product_id);

if ($query->execute()) {
    //get the specific id product with his seller info
    $result = $query->get_result();
    $response = [];
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
}

echo json_encode($response);
