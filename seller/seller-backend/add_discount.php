<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


$id = $_POST["product_id"];
$code = $_POST["code"];
$percentage = $_POST["percentage"];

$query = $mysqli -> prepare("INSERT INTO discounts (code, percentage, product_id) VALUE (?, ?, ?)") ;

$query->bind_param('sss', $code, $percentage, $id);

echo $query -> execute(); 

?>