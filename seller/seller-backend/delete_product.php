<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

include("connection.php");

$id = $_POST["product_id"];

$query = $mysqli -> prepare("DELETE FROM products WHERE id = ? ");
$query->bind_param('s', $id);
echo $query -> execute();
?>