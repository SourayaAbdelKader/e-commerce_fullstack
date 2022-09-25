<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


$id = $_POST["seller_id"];
$name = $_POST["name"];

$query = $mysqli -> prepare("INSERT INTO categories (name, seller_id) VALUE (?, ?)") ;

$query->bind_param('ss', $name,  $id);

echo $query -> execute(); 

?>