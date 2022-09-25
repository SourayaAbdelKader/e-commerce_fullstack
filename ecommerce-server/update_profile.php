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

$client_id = $_POST['client_id'];
$email = $_POST['email']; //used to overwrite picture
$new_name = $_POST['new_name'];
$bio = $_POST['new_bio'];
$image_url_base64 = $_POST['image_url'];


$image_url = '';
// update profile picture/overwrite old one if there exists a new one 
if ($image_url_base64) {
    $image = base64_to_jpeg($image_url_base64, 'user_images/' . $email . '.jpeg');
    $target_Path = "/user_images";
    move_uploaded_file($image, $target_Path);
    $image_url = $email . ".jpeg";
}


// new profile picture exists
if ($image_url) {
    $sql_query = "
UPDATE users 
SET 
name =? , bio = ?, profile=?  
WHERE
    id = ?";
    $query = $mysqli->prepare($sql_query);
    $query->bind_param('ssss', $new_name, $bio, $image_url, $client_id);
}
// no new profile picture exists
else {
    $sql_query = "
UPDATE users 
SET 
name =? , bio = ?
WHERE
    id = ?";
    $query = $mysqli->prepare($sql_query);
    $query->bind_param('sss', $new_name, $new_bio, $client_id);
}


$query->execute();
$response = [];
$response['success'] = true;

if ($response) echo json_encode($image_url);
