<?php
session_start();
require 'connect.php';

$bName = $_SESSION['bName'];
$sql = "SELECT * FROM card WHERE bName = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $bName);
$stmt->execute();
$result = $stmt->get_result();

$cards = [];

while ($row = $result->fetch_assoc()) {
    $cards[] = $row;
}

header('Content-Type: application/json');
echo json_encode($cards);
?>
