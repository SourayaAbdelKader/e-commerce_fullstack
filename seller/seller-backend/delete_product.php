<?php

include("connection.php");

$id = $_POST["product_id"];

$query = $mysqli -> prepare("DELETE FROM products WHERE id = ? ");
$query->bind_param('s', $id);
echo $query -> execute();
?>