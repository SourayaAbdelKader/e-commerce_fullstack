<?php

include("connection.php");

$id = $_POST["product_id"];
$description = $_POST["description"];

$query = $mysqli -> prepare("INSERT INTO advertisements (description, product_id) VALUE (?, ?)") ;

$query->bind_param('ss', $description, $id);

echo $query -> execute(); 

?>