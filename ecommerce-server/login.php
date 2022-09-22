<?php
include("connection.php");


$email = $_GET['email'];
$password = $_GET['password'];
$password = hash('sha256', $password . 'sayhiecommerce');
$user_type = $_GET['user_type'];


if ($user_type == 'client') {
    $query = $mysqli->prepare("SELECT id, name, email, phone_number, profile, access FROM users WHERE email=? and password=? and user_type=?");
    $query->bind_param('sss', $email, $password, $user_type);
    $query->execute();
    $array = $query->get_result();

    $response = [];
    while ($a = $array->fetch_assoc()) {
        $response[]  = $a;
    }
}
// for seller login
else {
    $query = $mysqli->prepare("SELECT id,name, email, phone_number, profile, access, shop_location, shop_description FROM users WHERE email=? and password=? and user_type=?");
    $query->bind_param('sss', $email, $password, $user_type);
    $query->execute();
    $array = $query->get_result();

    $response = [];
    while ($a = $array->fetch_assoc()) {
        $response[]  = $a;
    }
}

echo json_encode($response);
