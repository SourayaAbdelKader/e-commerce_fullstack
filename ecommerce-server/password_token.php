<?php
include("connection.php");

$email = $_POST['email'];
$token = 'POAIDSF' . md5($email) . 'A$@#$@';
$expiry_date = '23/9/2022';

$query = $mysqli->prepare("INSERT INTO password_tokens(email, token, expiry_date) VALUE (?,?,?)");
$query->bind_param('sss', $email, $token, $expiry_date); //change to ?,? to strings vars
$query->execute();

$response = [];
$response['success'] = true;

// after token created and added to the database  
if ($response) {
    $to = $email;
    $subject = "RESETTT";
    $txt = "Hello world!";
    $headers = "From: webmaster@example.com" . "\r\n" .
        "CC: somebodyelse@example.com";

    mail($to, $subject, $txt, $headers);
}

echo json_encode($response);
