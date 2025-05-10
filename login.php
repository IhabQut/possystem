<?php
include 'connect.php';
session_start();
$email =    mysqli_real_escape_string($conn, $_POST['log-email']);
$password = mysqli_real_escape_string($conn, $_POST['log-password']);
$encrypt_pass = md5($password);

$sql_check = "SELECT * FROM users WHERE bEmail='$email' AND bPassword = '$encrypt_pass'";
$check_account = mysqli_query($conn, $sql_check);

if (!empty($email) && !empty($password)) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (mysqli_num_rows($check_account) > 0) {
            $row = mysqli_fetch_assoc($check_account);
            $_SESSION["bEmail"] = $row["bEmail"];
            $_SESSION["bName"] = $row["bName"];

            echo 'login-success';
        } else {
            echo "البريد/كلمة المرور المدخلة غير صحيح";
        }
    } else {
        echo "البريد المدخل غير صحيح";
    }
} else {
    echo "الرجاء تعبئة البيانات";
}