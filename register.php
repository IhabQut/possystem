<?php
include 'connect.php';

$name =     mysqli_real_escape_string($conn, $_POST['reg-name']);
$email =    mysqli_real_escape_string($conn, $_POST['reg-email']);
$password = mysqli_real_escape_string($conn, $_POST['reg-password']);
$encrypt_pass = md5($password);

if (!empty($name) && !empty($email) && !empty($password)) {

    $sql_nCheck = "SELECT * FROM users WHERE bName='$name'";
    $verify_name = mysqli_query($conn, $sql_nCheck);

    if (filter_var($name, FILTER_VALIDATE_URL)) {

    }
    if (mysqli_num_rows($verify_name) > 0) {
        echo "الإسم محجوز";
    } else {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $sql_eCheck = "SELECT * FROM users WHERE bEmail='$email'";
            $verify_email = mysqli_query($conn, $sql_eCheck);

            if (mysqli_num_rows($verify_email) > 0) {
                echo "البريد الاكتروني محجوز";
            } else {
                $sql_insert = "INSERT INTO users(bName, bEmail, bPassword)
                        VALUES ('{$name}','{$email}','{$encrypt_pass}')";
                $insert = mysqli_query($conn, $sql_insert);
                if ($insert) {
                    echo "registered-successfully";
                } else {
                    echo "حصل خلل في التسجيل";
                }
            }
        } else {
            echo "البريد المدخل غير صحيح";
        }
    }
} else {
    echo "الرجاء تعبئة البيانات";
}
