<?php
include("connection.php");

$email = $_GET["email"];
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$email = filter_var($email, FILTER_VALIDATE_EMAIL);

$query = $mysqli->prepare("SELECT COUNT(*) AS found FROM users WHERE email=?");
$query->bind_param('s', $email);
$query->execute();
$array = $query->get_result();

$response = [];
while ($a = $array->fetch_assoc()) {
    $response[] = $a;
}
echo json_encode(($response));
?>