<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit();
}

if (!isset($_SESSION['bEmail']) || !isset($_SESSION['bName'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit();
}

$original = isset($_POST['original']) ? trim($_POST['original']) : '';
$newName = isset($_POST['newName']) ? trim($_POST['newName']) : '';
$price = isset($_POST['price']) ? trim($_POST['price']) : '';
$quantity = isset($_POST['quantity']) ? trim($_POST['quantity']) : '';
$category = isset($_POST['category']) ? trim($_POST['category']) : '';
$bName = $_SESSION['bName'];

$errors = [];
if (empty($original)) $errors[] = 'Original card name required';
if (empty($newName)) $errors[] = 'New card name required';
if (empty($price)) $errors[] = 'Price required';
if (empty($quantity)) $errors[] = 'Quantity required';
if (!is_numeric($price)) $errors[] = 'Price must be a number';
if (!is_numeric($quantity)) $errors[] = 'Quantity must be a number';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit();
}

$response = ['success' => false, 'message' => ''];

try {
    $checkStmt = $conn->prepare("SELECT cardName FROM card WHERE cardName = ? AND bName = ?");
    $checkStmt->bind_param("ss", $original, $bName);
    $checkStmt->execute();

    if ($checkStmt->get_result()->num_rows === 0) {
        throw new Exception("Card not found in your business");
    }

    if ($original !== $newName) {
        $dupStmt = $conn->prepare("SELECT cardName FROM card WHERE cardName = ? AND bName = ?");
        $dupStmt->bind_param("ss", $newName, $bName);
        $dupStmt->execute();

        if ($dupStmt->get_result()->num_rows > 0) {
            throw new Exception("You already have a card with this name");
        }
    }

    $updateStmt = $conn->prepare("UPDATE card SET 
        cardName = ?, 
        cPrice = ?, 
        cQuantity = ?, 
        cName = ? 
        WHERE cardName = ? AND bName = ?");
    
    $updateStmt->bind_param("ssssss", $newName, $price, $quantity, $category, $original, $bName);

    if ($updateStmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Card updated successfully";
    } else {
        throw new Exception("Database update failed");
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>