<?php
session_start();
include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$cardName = $data['cardName'];
$bName = $_SESSION['bName'];

if ($cardName && $bName) {
    $stmt = $conn->prepare("DELETE FROM card WHERE cardName = ? AND bName = ?");
    $stmt->bind_param("ss", $cardName, $bName);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}
?>
