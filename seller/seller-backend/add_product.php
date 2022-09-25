<?php

include("connection.php");

$id = $_POST["categorie_id"];

$name = $_POST["title"];
$description = $_POST["description"];
$price = $_POST["price"];
$condition = $_POST["condition"];
$main_image = $_POST["main_image"];
$image1 = $_POST["image1"];
$image2 = $_POST["image2"];

$folderPath = "product_images/";

$image_parts = explode(";base64",$main_image);
$image_type_aux = explode("image/",$image_parts[0]);
$image_type = $image_type_aux[1];
$image_base64_main = base64_decode($image_parts[1]);

$file = $folderPath.$id."-main_image.png"; // => folderpath/name.ext
file_put_contents($file,$image_base64_main);

$image_parts = explode(";base64",$image1);
$image_type_aux = explode("image/",$image_parts[0]);
$image_type = $image_type_aux[1];
$image_base64_image1 = base64_decode($image_parts[1]);


$file = $folderPath.$id."-image1.png"; // => folderpath/name.ext
file_put_contents($file,$image_base64_image1);

$image_parts = explode(";base64",$image2);
$image_type_aux = explode("image/",$image_parts[0]);
$image_type = $image_type_aux[1];
$image_base64_image2 = base64_decode($image_parts[1]);


$file = $folderPath.$id."-image2.png"; // => folderpath/name.ext
file_put_contents($file,$image_base64_image2);

$query = $mysqli -> prepare("INSERT INTO products (title, description, price, main_image, categorie_id, image1, image2, `condition`) VALUE (?, ?, ?, ?, ?, ?, ?, ?)") ;

$query->bind_param('ssssssss', $name,  $description, $price, $image_base64_main, $id, $image_base64_image1, $image_base64_image2, $condition );

echo $query -> execute();

?>