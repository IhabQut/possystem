<?php
session_start();
include 'connect.php';

$bName = $_SESSION['bName'] ?? '';

$sql = "SELECT billnum, total_sale, note FROM bills WHERE bName = '$bName' ORDER BY billnum DESC";
$result = $conn->query($sql);

$bills = [];
while ($row = $result->fetch_assoc()) {
    $bills[] = $row;
}
echo json_encode($bills);
?>
