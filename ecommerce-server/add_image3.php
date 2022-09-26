<?php 

$base64String = $_POST["base64String"];
$username = $_POST["username"];

$folderPath = "profile-photos/";

$image_parts = explode(";base64",$base64String);
$image_type_aux = explode("image/",$image_parts[0]);
$image_type = $image_type_aux[1];
$image_base64 = base64_decode($image_parts[1]);


$file = $folderPath.$username.".png"; // => folderpath/name.ext

file_put_contents($file,$image_base64);

echo json_encode(urlencode($file));
?>