<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

include("connection.php");

$id = $_POST["product_id"];
$title = $_POST["title"];
$description = $_POST["description"];
$price = $_POST["price"];
$condition = $_POST["condition"];
$main_image = $_POST["main_image"];
$image1 = $_POST["image1"];
$image2 = $_POST["image2"];

$query = $mysqli -> prepare("
UPDATE products 
SET 
    title = ?,
    description = ?,
    price = ?,
    `condition` = ?,
    main_image = ?,
    image1 = ?,
    image2 = ?
WHERE
    id = ? ");
$query->bind_param('ssssssss', $title, $description, $price, $condition, $main_image, $image1, $image2, $id);
echo $query -> execute();
?>