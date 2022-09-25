<?php
include "connection.php"; //get connection object and headers

if (isset($_POST['product_id']) and isset($_POST['code'])) {
    $product_id = $_POST['product_id'];
    $discount_code = $_POST['code'];
    // get the percentage of this discount code if found along with the product_id
    $query = $mysqli->prepare("SELECT percentage FROM discounts WHERE product_id=? AND code=?");
    $query->bind_param("is", $product_id, $discount_code);

    if ($query->execute()) {
        $data = [];
        //get the percentage of the discount
        $result = $query->get_result();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}
