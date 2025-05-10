<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

$original = isset($_POST['original']) ? trim($_POST['original']) : '';
$new = isset($_POST['new']) ? trim($_POST['new']) : '';
$bName = $_SESSION['bName'];

if (empty($original)) {
    echo json_encode(['success' => false, 'message' => 'خطاء في اختيار التصنيف - يرجى المحاولة مرة اخرى']);
    exit();
} 
if (empty($new)) {
    echo json_encode(['success' => false, 'message' => 'يجب اختيار اسم جديد']);
    exit();
}

$response = ['success' => false, 'message' => ''];

try {
    $checkStmt = $conn->prepare("SELECT cName FROM category WHERE cName = ? AND bName = ?");
    $checkStmt->bind_param("ss", $original, $bName);
    $checkStmt->execute();

    $result = $checkStmt->get_result();
    if ($result->num_rows === 0) {
        throw new Exception("التصنيف غير متوفر");
    }

    if ($original !== $new) {
        $dupStmt = $conn->prepare("SELECT cName FROM category WHERE cName = ? AND bName = ?");
        $dupStmt->bind_param("ss", $new, $bName);
        $dupStmt->execute();

        if ($dupStmt->get_result()->num_rows > 0) {
            throw new Exception("هذا التصنيف موجود بالفعل");
        }
    }

    $updateStmt = $conn->prepare("UPDATE category SET cName = ? WHERE cName = ? AND bName = ?");
    $updateStmt->bind_param("sss", $new, $original, $bName);

    if ($updateStmt->execute()) {
        $response['success'] = true;
        $response['message'] = "تم تحديث التصنيف بنجاء";
    } else {
        throw new Exception("خطاء في التحديث");
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>