<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


$id = $_POST["product_id"];
$description = $_POST["description"];

$query = $mysqli -> prepare("INSERT INTO advertisements (description, product_id) VALUE (?, ?)") ;

$query->bind_param('ss', $description, $id);

echo $query -> execute(); 

?>