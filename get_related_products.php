<?php
include "connection.php";
$data = [];
if (isset($_POST["categorie_id"])) {
  $id = $_POST["categorie_id"];
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
