<?php
session_start();
include 'connect.php';

$bName = $_SESSION['bName'] ?? '';
$total_sale = $_POST['total_sale'] ?? 0;
$note = $_POST['note'] ?? 'null';

if (!$bName || $total_sale <= 0) {
    echo 'Invalid data';
    exit;
}

$noteSQL = ($note === 'null') ? "NULL" : "'" . $conn->real_escape_string($note) . "'";

$sql = "INSERT INTO bills (bName, total_sale, note) VALUES ('$bName', '$total_sale', $noteSQL)";
if ($conn->query($sql) === TRUE) {
    echo 'success';
} else {
    echo 'DB Error: ' . $conn->error;
}
?>
