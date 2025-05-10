<?php
include 'connect.php';
session_start();

$bName = $_SESSION['bName'];
$cardName = $_POST['cardName'] ?? '';

if (empty($cardName)) {
    echo json_encode(['error' => 'No card name received']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM card WHERE bName = ? AND cardName = ?");
$stmt->bind_param("ss", $bName, $cardName);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    echo json_encode([]);
}
?>
