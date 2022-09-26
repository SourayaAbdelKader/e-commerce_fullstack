<?php


include("connection.php");

$id = $_POST["user_id"];

$query = $mysqli -> prepare("SELECT product_id, COUNT(?) as views from viewers GROUP BY product_id order by views DESC LIMIT 5");
$query->bind_param('s', $id);
$query->execute();
$array = $query->get_result();

$response = [];
while ($a = $array->fetch_assoc()) {
    $response[] = $a;
}
echo json_encode(($response));

?>