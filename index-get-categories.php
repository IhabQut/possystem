<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['bName'])) {
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

include 'connect.php';

$bName = $_SESSION['bName'];

$sql = "SELECT cName FROM category WHERE bName = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $bName);
$stmt->execute();
$result = $stmt->get_result();

$categories = [];

while ($row = $result->fetch_assoc()) {
    $categories[] = $row['cName'];
}

echo json_encode($categories);
?>
