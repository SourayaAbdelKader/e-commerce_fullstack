<?php
include "connection.php";
$code = $_POST['code'];
$sql = "DELETE FROM discounts WHERE code=?";
$query = $mysqli->prepare($sql);
$query->bind_param('s', $code);
if ($query->execute()) {
    $response = true;
}

echo json_encode($response);
