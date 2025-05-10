
<?php
    session_start();
    if (isset($_SESSION["bEmail"])){
        header("Location: index.php");
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <script>
        window.history.forward();
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <title>Login-Reg Page</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="./css/loginStyle.css">
</head>

<body>

    <div class="loading-cover" ></div>
    <div class="wrapper">
        <div class="form-header">
            <div class="titles">
                <div class="title-login">تسجيل الدخول </div>
                <div class="title-register"> إنشاء حساب</div>
            </div>
        </div>
        <!-- Error Container -->
         <div class="error-message">error test</div>

        <!-- Login Form -->
        <form  action="#" method="POST" class="login-form" autocomplete="off" id="form1">

            <div class="input-box">
                <input type="text" name="log-email" class="input-field" id="log-email">
                <label for="log-email" class="log-label">البريد الإلكتروني</label>
                <i class='bx bx-envelope icon'></i>
            </div>

            <div class="input-box">
                <input type="password" name="log-password" class="input-field" id="log-pass">
                <label for="log-pass" class="log-label">كلمة السر</label>
                <i class='bx bx-lock-alt icon'></i>
            </div>

            <div class="form-cols">
                <div class="col-1"></div>
                <div class="col-2">
                    <a href="#"> </a>
                </div>
            </div>

            <div class="input-box">
                <button class="btn-submit" name="SignInBtn" id="SignInBtn">سجل دخولك<i class='bx bx-log-in'></i> </button>
                
            </div>

            <div class="switch-form">
                <span>
                    لا تمتلك حسابً؟ <a href="#" onclick="registerFunction()">إنشاء حساب</a>
                </span>
            </div>
        </form>
    
        <!-- Register Form -->
         
        <form action="#" method="POST" class="register-form" autocomplete="off" id="form2">

            <div class="input-box">
                <input type="text" class="input-field" name="reg-name" id="reg-name">
                <label for="reg-name" class="log-label">إسم المنشأة</label>
                <i class='bx bx-briefcase-alt icon'></i>
            </div>

            <div class="input-box">
                <input type="text" class="input-field" name="reg-email" id="reg-email">
                <label for="reg-email" class="log-label">البريد الإلكتروني</label>
                <i class='bx bx-envelope icon'></i>
            </div>

            <div class="input-box">
                <input type="password" class="input-field" name="reg-password" id="reg-pass">
                <label for="reg-pass" class="log-label">كلمة السر</label>
                <i class='bx bx-lock-alt icon'></i>
            </div>

            <div class="form-cols">
                <div class="col-1">
                    <input class="checkbox" id="checkbox_policy" type="checkbox">
                    <label for="checkbox_policy">
                        الموافقة على 
                        <a href="./policy.html">الشروط</a>
                    </label>
                </div>
                <div class="col-2"></div>
            </div>

            <div class="input-box">
                <button class="btn-submit" name="SignUpBtn" id="SignUpBtn">تاكيد حساب جديد <i class='bx bxs-down-arrow'></i> </button>
            </div>

            <div class="switch-form">
                <span>
                    هل تمتلك حساب مسجل؟ <a href="#" onclick="loginFunction()">سجل دخولك</a>
                </span>
            </div>

        </form>
    </div>
    <script src="js/login.js"></script>
    <script src="js/auth.js"></script>
</body>

</html>