<?php
include "connection.php"; //get connection and add header to allow access
$data = [];
if (isset($_POST["key"])) {
  $key = $_POST["key"];
  $like = "%$key%";
  // search for a key in description title or categories name of a product 
  //get all info of match  products
  $sql = "select * from products where 
        description like ? OR  
        title like ? OR
        categorie_id in (select  id from categories where name like ?)";
  $query = $mysqli->prepare($sql);
  $query->bind_param("sss", $like, $like, $like);
  if ($query->execute()) {
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
  }
}
echo json_encode($data);
