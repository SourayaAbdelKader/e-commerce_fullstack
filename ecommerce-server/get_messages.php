<?php
include "connection.php";
$data = [];
if (isset($_POST["receiver_id"])) {
  $id = $_POST["receiver_id"];
  $query = $mysqli->prepare("select * from messages m,users u where  u.id=m.sender_id and m.receiver_id=?");
  $query->bind_param("i", $id);
  if ($query->execute()) {
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
  }
}
echo json_encode($data);
