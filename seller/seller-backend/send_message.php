<?php

$id = $_POST["seller_id"];
$receiver_id = $_POST["receiver_id"];
$message = $_POST["message"];
$date = $_POST["date"]

$query = $mysqli -> prepare("INSERT INTO messages (sender_id, receiver_id, text, date) VALUE (?, ?, ?, ?)") ;

$query->bind_param('ssss', $id, $receiver_id, $message, $date);

echo $query -> execute(); 

?>