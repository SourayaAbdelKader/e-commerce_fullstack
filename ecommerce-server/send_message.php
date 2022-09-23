<?php
include "connection.php";
$done = false;
if (
    isset($_POST["sender_id"]) && isset($_POST["receiver_id"]) && isset($_POST["text"])
    && isset($_POST["date"])
) {
    $sender_id = $_POST["sender_id"];
    $receiver_id = $_POST["receiver_id"];
    $text = $_POST["text"];
    $date = $_POST["date"];
    $query = $mysqli->prepare("INSERT messages  (sender_id,receiver_id,text,date)
                              value(?,?,?,?)   ");
    $query->bind_param("iiss", $sender_id, $receiver_id, $text, $date);
    if ($query->execute()) {
        $done = true;
    }
}
echo json_encode($done);
