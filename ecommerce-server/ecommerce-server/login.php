<?php
include("connection.php");


$email = $_GET['email'];
$password = $_GET['password'];
$password = hash('sha256', $password . 'sayhiecommerce');
$user_type = $_GET['user_type'];
$response = "";

if ($user_type == 'client') {
    $query = $mysqli->prepare("SELECT id, name, email, phone_number, image_url, access FROM users WHERE email=? and password=? and user_type=?");
    $query->bind_param('sss', $email, $password, $user_type);
    $query->execute();
    $array = $query->get_result();

    $response = [];
    $response = $array->fetch_assoc();
}
// for seller login
else if ($user_type == 'seller') {
    $query = $mysqli->prepare("SELECT id,name, email, phone_number, image_url, access, shop_location, bio FROM users WHERE email=? and password=? and user_type=?");
    $query->bind_param('sss', $email, $password, $user_type);
    $query->execute();
    $array = $query->get_result();

    $response = [];
    $response = $array->fetch_assoc();
}
// for seller login
else if ($user_type == 'admin') {
    $query = $mysqli->prepare("SELECT id,name, email, phone_number, image_url, access, shop_location, bio FROM users WHERE email=? and password=? and user_type=?");
    $query->bind_param('sss', $email, $password, $user_type);
    $query->execute();
    $array = $query->get_result();
    $response = [];
    $response = $array->fetch_assoc();
}

echo json_encode($response);
