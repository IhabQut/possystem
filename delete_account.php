<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['bName'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$bName = $_SESSION['bName'];

try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn->begin_transaction();

    $stmt1 = $conn->prepare("DELETE FROM card WHERE bName = ?");
    $stmt1->bind_param("s", $bName);
    $stmt1->execute();

    $stmt2 = $conn->prepare("DELETE FROM category WHERE bName = ?");
    $stmt2->bind_param("s", $bName);
    $stmt2->execute();

    $stmt3 = $conn->prepare("DELETE FROM bills WHERE bName = ?");
    $stmt3->bind_param("s", $bName);
    $stmt3->execute();

    $stmt4 = $conn->prepare("DELETE FROM users WHERE bName = ?");
    $stmt4->bind_param("s", $bName);
    $stmt4->execute();

    $conn->commit();
    session_destroy();

    echo json_encode(['status' => 'success']);
    exit;

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    exit;
}
?>
