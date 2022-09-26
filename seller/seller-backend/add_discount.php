<?php

include("connection.php");

$id = $_POST["product_id"];
$code = $_POST["code"];
$percentage = $_POST["percentage"];

$query = $mysqli -> prepare("INSERT INTO discounts (code, percentage, product_id) VALUE (?, ?, ?)") ;

$query->bind_param('sss', $code, $percentage, $id);

echo $query -> execute(); 

?>