<?php
session_start();
require 'connect.php';

header('Content-Type: application/json');

// 1. Verify session
if (!isset($_SESSION['bName'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

// 2. Get POST data
$input = json_decode(file_get_contents('php://input'), true);
$updates = $input['updates'] ?? [];
$bName = $_SESSION['bName'];

// 3. Initialize response
$response = ['success' => false, 'message' => ''];

try {
    $conn->begin_transaction();
    
    foreach ($updates as $update) {
        $cardName = $conn->real_escape_string($update['name']);
        $quantity = (int)$update['quantity'];
        
        if ($quantity <= 0) continue;
        

        $stmt = $conn->prepare("UPDATE card SET cQuantity = cQuantity - ? 
                              WHERE cardName = ? AND bName = ?");
        $stmt->bind_param("iss", $quantity, $cardName, $bName);
        $stmt->execute();
        

        $checkStmt = $conn->prepare("SELECT cQuantity FROM card 
                                    WHERE cardName = ? AND bName = ?");
        $checkStmt->bind_param("ss", $cardName, $bName);
        $checkStmt->execute();
        $result = $checkStmt->get_result();
        
        if ($result->num_rows > 0 && $result->fetch_assoc()['cQuantity'] <= 0) {
            $conn->query("DELETE FROM card WHERE cardName = '$cardName' AND bName = '$bName'");
        }
    }
    
    $conn->commit();
    $response['success'] = true;
} catch (Exception $e) {
    $conn->rollback();
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>