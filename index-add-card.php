<?php
session_start();
require 'connect.php';

$cardName = $_POST['cardName'] ?? '';
$cPrice = $_POST['cPrice'] ?? '';
$cQuantity = $_POST['cQuantity'] ?? '';
$cName = $_POST['cName'] ?? '';
$bName = $_SESSION['bName'];

if ($cardName && $cPrice && $cQuantity && $cName && $bName) {
    $check = $conn->prepare("SELECT * FROM card WHERE cardName = ? AND bName = ?");
    $check->bind_param("ss", $cardName, $bName);
    $check->execute();
    $checkResult = $check->get_result();

    if ($checkResult->num_rows > 0) {
        echo "duplicate";
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO card (cardName, cPrice, cQuantity, cName, bName) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $cardName, $cPrice, $cQuantity, $cName, $bName);
    
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "db_error";
    }
} else {
    echo "missing_fields";
}
?>
