<?php
include "connection.php";
$data = [];
if (isset($_POST["key"])) {
  $key = $_POST["key"];
  $like = "%$key%";
  $sql = "select * from products where 
        description like ? OR  
        title like ? OR
        categorie_id=(select  id from categories where name like ?)";
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
