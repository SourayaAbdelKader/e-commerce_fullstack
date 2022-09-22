<?php
include "connection.php";
$done = false;
if (isset($_POST["client_id"]) && isset($_POST["total"]) && isset($_POST["checkout_date"])) {
  $total = $_POST["total"];
  $checkout_date = $_POST["checkout_date"];
  $client_id = $_POST["client_id"];
  $sql = "UPDATE orders set total=? , checkout_date=? , isCheckout=1 where client_id=? and isCheckout=0";
  $query = $mysqli->prepare($sql);
  $query->bind_param("isi", $total, $checkout_date, $client_id);
  $query2 = $mysqli->prepare("INSERT into orders  (client_id,total,isCheckout,checkout_date) values(?,0,0,'0')");
  $query2->bind_param("i", $client_id);
  if ($query->execute() && $query2->execute()) {

    $done = true;
  }
}
echo json_encode($done);
