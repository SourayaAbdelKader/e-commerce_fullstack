<?php

$id = $_POST["seller_id"];
$name = $_POST["name"];

$query = $mysqli -> prepare("INSERT INTO categories (name, seller_id) VALUE (?, ?)") ;

$query->bind_param('ss', $name,  $id);

echo $query -> execute(); 

?>