<?php

include("connection.php");

$id = $_POST["product_id"];

$query = $mysqli -> prepare("SELECT * FROM advertisements WHERE product_id = ?");
$query->bind_param('s', $id);
$query -> execute();
$array = $query -> get_result();

$response = [];

while($a = $array->fetch_assoc()){
    $response[] = $a;
}

$json = json_encode($response);
echo $json;
?>