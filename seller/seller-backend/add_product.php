<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


$id = $_POST["id"];

$name = $_POST["name"];
$description = $_POST["desciption"];
$price = $_POST["price"];
$condition =$_POST["condition"];

$query = $mysqli -> prepare("INSERT INTO products (title, description, price, categorie_id, condition) VALUE (?, ?, ?, ?, ?)") ;

$query->bind_param('ssss', $name,  $description, $price, 1, $condition );

$query -> execute();
$array = $query -> get_result();

$response = [];

while($a = $array->fetch_assoc()){
    $response[] = $a;
}

$json = json_encode($response);
echo $json;

?>