<?php
include("connection.php");


// turn base64string to image (.jpeg)
function base64_to_jpeg($base64_string, $output_file)
{
  // open the output file for writing
  $ifp = fopen($output_file, 'wb');
  // split the string on commas
  // $data[ 0 ] == "data:image/png;base64"
  // $data[ 1 ] == <actual base64 string>
  $data = explode(',', $base64_string);
  // we could add validation here with ensuring count( $data ) > 1
  fwrite($ifp, base64_decode($data[0]));
  // clean up the file resource
  fclose($ifp);
  return $output_file;
}

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$phone_number = $_POST['phone_number'];
$user_type = $_POST['user_type'];
$shop_location = $_POST['shop_location'];
$bio = $_POST['bio'];
$access = 1;

// taking profile picture if added (received as base64 and save it as a picture)
$profile_base64 = $_POST['image_url'];
if ($profile_base64) {
 // $profile_base64= explode(',', $profile_base64)[1] ;
  $image = base64_to_jpeg($profile_base64, 'user_images/' . $email . '.jpeg');
  $target_Path = "/user_images";
  move_uploaded_file($image, $target_Path);
  $profile = "./user_images/" . $email . ".jpeg";
} else {
  $profile = '';
}

$password = hash('sha256', $password . 'sayhiecommerce');
$query = $mysqli->prepare("INSERT INTO users(name, email, password, phone_number, image_url, access, user_type, shop_location, bio) VALUE (?,?,?,?,?,?,?,?,?)");
$query->bind_param('sssssssss', $name, $email, $password, $phone_number, $profile, $access, $user_type, $shop_location, $bio); //change to ?,? to strings vars
$query->execute();

$response = [];
$response['success'] = true;

echo json_encode($response);
