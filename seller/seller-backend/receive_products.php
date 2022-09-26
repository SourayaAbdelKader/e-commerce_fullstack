<?php

include("connection.php");

$categorie_id = $_POST["categorie_id"];

$query = $mysqli -> prepare("SELECT * FROM products WHERE categorie_id = ? ");
$query->bind_param('s', $categorie_id);
$query -> execute();
$array = $query -> get_result();

$response = [];

while($a = $array->fetch_assoc()){
    $response[] = $a;
}

$json = json_encode($response);
echo $json;
?>