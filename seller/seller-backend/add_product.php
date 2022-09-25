<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


$id = $_POST["categorie_id"];

$name = $_POST["title"];
$description = $_POST["description"];
$price = $_POST["price"];
$condition =$_POST["condition"];

$query = $mysqli -> prepare("INSERT INTO products (title, description, price, categorie_id, condition) VALUE (?, ?, ?, ?, ?)") ;

$query->bind_param('sssss', $name,  $description, $price, $id, $condition );

echo $query -> execute();


?>