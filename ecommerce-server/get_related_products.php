<?php
include "connection.php";//get connection and add header to allow access
$data = [];
if (isset($_POST["categorie_id"])) {
  $id = $_POST["categorie_id"];
  // get all products with same categories name or this name in title or description of a products
  $sql = "select * from products p join categories c on  c.id=p.categorie_id
          where c.name =(select name from categories where id=?) or 
          p.title like  CONCAT('%',(select name from categories where id=?),'%') or
          p.description like  CONCAT('%',(select name from categories where id=?),'%')";
  $query = $mysqli->prepare($sql);
  $query->bind_param("iii", $id, $id, $id);
  if ($query->execute()) {
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
  }
}
echo json_encode($data);
