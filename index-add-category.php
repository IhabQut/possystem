<?php
session_start();
require 'connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $cName = $_POST['cName'] ?? '';
    $bName = $_SESSION['bName'];

    if ($cName && $bName) {
        $check = $conn->prepare("SELECT * FROM category WHERE cName = ? AND bName = ?");
        $check->bind_param("ss", $cName, $bName);
        $check->execute();
        $checkResult = $check->get_result();

        if ($checkResult->num_rows > 0) {
            echo "duplicate";
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO category (cName, bName) VALUES (?, ?)");
        $stmt->bind_param("ss", $cName, $bName);
        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "db_error";
        }
    } else {
        echo "missing_fields";
    }
}
?>
