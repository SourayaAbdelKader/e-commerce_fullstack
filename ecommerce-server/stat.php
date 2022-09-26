<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
$sql = "select count(id) as sellers from users where user_type='seller' ";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  $data["sellers"] =  $result->fetch_assoc()["sellers"];
}
$sql = "select count(id) as clients from users where user_type='client' ";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  $data["clients"] =  $result->fetch_assoc()["clients"];
}

$sql = "select count(id) as products from products   ";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  $data["products"] =  $result->fetch_assoc()["products"];
}

$sql = "select sum(o.total) as total , u.name  from orders o 
 left join users u on o.client_id=u.id 
where   o.isCheckout=1 and u.user_type='client' and
CAST(o.checkout_date AS int) >  UNIX_TIMESTAMP(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -7 DAY)) group by u.id order by   total desc";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  $week = [];
  while ($a = $result->fetch_assoc()) {
    $week[] =  $a;
  }
  $data["week"] = $week;
}



$sql = "select sum(o.total) as total , u.name  from orders o 
 left join users u on o.client_id=u.id 
where   o.isCheckout=1 and u.user_type='client' and
CAST(o.checkout_date AS int) >  UNIX_TIMESTAMP(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -30 DAY)) group by u.id";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  $month = [];
  while ($a = $result->fetch_assoc()) {
    $month[] =  $a;
  }
  $data["month"] = $month;
}

$sql = "select sum(o.total) as total , u.name  from orders o 
 left join users u on o.client_id=u.id 
where   o.isCheckout=1 and u.user_type='client' and
CAST(o.checkout_date AS int) >  UNIX_TIMESTAMP(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -30 DAY)) group by u.id";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  $month = [];
  while ($a = $result->fetch_assoc()) {
    $month[] =  $a;
  }
  $data["month"] = $month;
}


$sql = "select sum(o.total) as total , u.name  from orders o 
 left join users u on o.client_id=u.id 
where   o.isCheckout=1 and u.user_type='client' and
CAST(o.checkout_date AS int) >  UNIX_TIMESTAMP(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -365 DAY)) group by u.id";
$query = $mysqli->prepare($sql);
if ($query->execute()) {
  $result = $query->get_result();
  $year = [];
  while ($a = $result->fetch_assoc()) {
    $year[] =  $a;
  }
  $data["year"] = $year;
}



echo json_encode($data);
