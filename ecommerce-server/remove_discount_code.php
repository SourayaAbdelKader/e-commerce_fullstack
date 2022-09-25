<?php
include "connection.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$code = $data['code'];
$sql = "DELETE FROM discounts WHERE code=?";
$query = $mysqli->prepare($sql);
$query->bind_param('s', $code);
if ($query->execute()) {
    $response = true;
}

echo json_encode($response);
