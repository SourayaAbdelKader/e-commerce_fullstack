<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


$id = $_POST["categorie_id"];

$name = $_POST["title"];
$description = $_POST["description"];
$price = $_POST["price"];
$condition = $_POST["condition"];
$main_image = $_POST["main_image"];
$image1 = $_POST["image1"];
$image2 = $_POST["image2"];


$query = $mysqli -> prepare("INSERT INTO products (title, description, price, main_image, categorie_id, image1, image2, condition) VALUE (?, ?, ?, ?, ?, ?, ?. ?)") ;

$query->bind_param('ssssssss', $name,  $description, $price, $main_image, $id, $image1, $image2, $condition );

echo $query -> execute();


?>