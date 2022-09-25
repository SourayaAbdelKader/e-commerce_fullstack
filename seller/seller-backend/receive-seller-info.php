<?php

include("connection.php");

$id = $_POST["id"];

$query = $mysqli -> prepare("SELECT * FROM users WHERE id = ?");
$query->bind_param('s', $id);
$query->execute();
$array = $query->get_result();

$response = [];
while ($a = $array->fetch_assoc()) {
    $response[] = $a;
}
echo json_encode(($response));

?>