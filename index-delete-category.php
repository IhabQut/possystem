<?php
session_start();
require 'connect.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$cName = $data['cName'] ?? null;
$bName = $_SESSION['bName'] ?? null;

if (!$cName || !$bName) {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM category WHERE cName = ? AND bName = ?");
$stmt->bind_param("ss", $cName, $bName);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
?>
