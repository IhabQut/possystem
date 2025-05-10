<?php
session_start();
if (!isset($_SESSION["bEmail"])) {
    header("Location: login_page.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>

<body class="" >

    <div class="custom-menu">
        <button type="button" class="update SHFbtn" target-id="">
            <i class="ri-settings-fill"></i>
        </button>
        <button type="button" class="delete SHFbtn" target-id="deleteForm">
            <i class="ri-delete-bin-2-fill"></i>
        </button>
    </div>

    <div class="loading-cover"> </div>
    <div class="container">
        <header>
            <div class="left-area">
                <div class="input-box">
                    <button class="btn-header SHFbtn" name="logOutBtn" id="logOutBtn" target-id="logoutForm"><i
                            class='bx bx-power-off icon-button'></i></button>
                </div>
                <div class="input-box">
                    <button class="btn-header SHFbtn btn-receipt" name="billsBtn" id="billsBtn" target-id="billsForm"><i
                            class='bx bxs-receipt icon-button'></i>فواتير </button>
                </div>
            </div>

            <div class="center-area">
                <div class="input-box search">
                    <input type="text" class="input-field" name="search" id="search" target-id="">
                    <label for="search" class="search-label">...البحث في المنتجات</label>
                    <i class='bx bx-search-alt icon-search'></i>
                </div>
            </div>

            <div class="right-area">
                <div class="input-box">
                    <button class="btn-header SHFbtn" name="accountBtn" id="accountBtn" target-id="accountForm"><i
                            class='bx bxs-user icon-button'></i></button>
                </div>

                <div class="input-box">
                    <button class="btn-header SHFbtn" name="settingsBtn" id="settingsBtn" target-id="settingsForm"><i
                            class='bx bxs-cog icon-button'></i></button>
                </div>


                <div class="input-box">
                    <button class="btn-header" name="theme" id="theme" onclick="darkMode()">
                        <i class='bx bxs-moon icon-button'></i></button>
                </div>
            </div>

            <div class="header-list">
                <div class="input-box">
                    <button class="btn-header" name="list-btn" id="list-btn">
                        <i class='bx bx-menu icon-button'></i>
                    </button>
                </div>
                <div class="list-menu"></div>
            </div>

        </header>

        <form action="" class="btn-forms">
            <div class="container">
                <!-- HEADER forms -->
                <div class="billsForm hForm" name="billsForm" id="billsForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <div class="form-content" id="bill-content">

                        <div type="button" class="bill">
                            <div class="label-area">
                                <label for="bill">رقم الفاتورة
                                    <i>25</i>
                                </label>

                                <label for="bill">المجموع
                                    <i>20000₪</i>
                                </label>
                            </div>

                            <textarea readonly for="bill" class="note">
                            </textarea>

                        </div>

                        <!-- added BILLS /\ -->
                    </div>
                    <label for="billsForm">الفواتير</label>
                </div>

                <div class="logoutForm hForm" name="logoutForm" id="logoutForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <button class="btn-confirm logoutConfirm" id="logoutConfirm" type="button">تاكيد</button>
                    <label for="logoutForm">تسجيل الخروج</label>
                </div>

                <!-- delete/update Forms -->
                <div class="deleteForm hForm" name="deleteForm" id="deleteForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <button class="btn-confirm deleteConfrim" id="deleteConfirm" type="button">تاكيد</button>
                    <label for="deleteForm"> تاكيد الحذف؟ </label>
                </div>

                <div class="updateForm hForm" name="updateForm" id="updateForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <label for="updateForm"> تحديث </label>
                    <div class="form-content">

                        <div class="input-area">
                            <input class="input-field" type="text" name="product-name" id="pName_update">
                            <label class="placeHolder">اسم المنتج</label>
                        </div>

                        <div class="input-area">
                            <input class="input-field" type="number" name="product-price" id="pPrice_update">
                            <label class="placeHolder" min="0" max="999999999">سعر المنتج</label>
                        </div>

                        <div class="input-area">
                            <input class="input-field" type="number" name="product-quantity" id="pQuantity_update">
                            <label class="placeHolder" min="0" max="99999">الكمية المتوفرة</label>
                        </div>

                        <div class="input-area">
                            <select class="select-field" name="Associated_cName_update" id="Associated_cName_update" data-original="">
                                <option style="color: gray;">غير محدد</option>
                            </select>
                            <label class="placeHolder"> : تصنيف المنتج </label>
                        </div>
                    </div>
                    <button class="btn-confirm updateConfrim" id="updateConfrim" type="button">تاكيد</button>

                </div>


                <div class="accountForm hForm" name="accountForm" id="accountForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <label for="accountForm">بيانات الحساب</label>
                    <div class="form-content">
                        <div class="bName">
                            <label for="accountForm"> إسم المنشأة </label>
                            <i><?php echo $_SESSION['bName']; ?></i>

                        </div>
                        <div class="bEmail">
                            <label for="accountForm"> البريد المستخدم </label>
                            <i><?php echo $_SESSION['bEmail']; ?></i>
                        </div>
                    </div>
                </div>

                <div class="settingsForm hForm" name="settingsForm" id="settingsForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <label for="settingsForm">إعدادات الحساب</label>
                    <button type="button" class="btn-confirm" id="delete-account-btn" >حذف الحساب</button>
                </div>

                <!-- CATEGORY form -->
                <div class="addCategoryForm hForm" name="addCategoryForm" id="addCategoryForm">

                    <label for="addCategoryForm">إضافة تصنيف جديد</label>
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>

                    <div class="form-content">
                        <div class="input-area">
                            <label class="responseMsg"></label>
                            <input class="input-field" type="text" name="category-name" id="cName">
                            <label class="placeHolder" id="labelCatName">اسم التصنيف</label>
                        </div>
                    </div>

                    <button class="btn-confirm" type="button" name="btnCatSubmit" id="btnCatSubmit">تاكيد</button>

                </div>

                <div class="updateCatForm hForm" name="updateCatForm" id="updateCatForm">

                    <label for="updateCatForm"> تعديل التصنيف </label>
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>

                    <div class="form-content">
                        <div class="input-area">
                            <label class="responseMsg"></label>
                            <input class="input-field" type="text" name="category-name" id="cName_update">
                            <label class="placeHolder" id="labelCatName_update">اسم التصنيف</label>
                        </div>
                    </div>

                    <button class="btn-confirm updateCatConfirm" type="button" name="updateCatConfirm" id="updateCatConfirm">تاكيد</button>

                </div>

                <!-- CARD form -->
                <div class="addCardForm hForm" name="addCardForm" id="addCardForm">

                    <label for="addCardForm">إضافة كرت معلومات</label>
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>

                    <div class="form-content">

                        <div class="input-area">
                            <input class="input-field" type="text" name="product-name" id="pName">
                            <label class="placeHolder">اسم المنتج</label>
                        </div>

                        <div class="input-area">
                            <input class="input-field" type="number" name="product-price" id="pPrice">
                            <label class="placeHolder" min="0" max="999999999">سعر المنتج</label>
                        </div>

                        <div class="input-area">
                            <input class="input-field" type="number" name="product-quantity" id="pQuantity">
                            <label class="placeHolder" min="0" max="99999">الكمية المتوفرة</label>
                        </div>

                        <div class="input-area">
                            <select class="select-field" name="Associated_cName" id="Associated_cName">
                                <option style="color: gray;">غير محدد</option>
                            </select>
                            <label class="placeHolder"> : تصنيف المنتج </label>
                        </div>
                    </div>

                    <button class="btn-confirm" type="button" id="btnCardSubmit">تاكيد</button>

                </div>



                <!-- forms for BILLS butons -->
                <div class="saleForm hForm" name="saleForm" id="saleForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <input class="input-field sale" type="number" name="product-name" id="saleValue" min="0" max="100" maxlength="3" placeholder="نسبة مئوية">
                    <button class="btn-confirm saleConfirm" id="saleConfirm" type="button">تاكيد</button>
                    <label for="saleForm">خصم</label>

                </div>
                <div class="noteForm hForm" name="noteForm" id="noteForm">
                    <button class="close" type="button"><i class="ri-close-large-line icon-button"></i></button>
                    <div class="form-content">
                        <textarea class="note-text" id="" name="" rows="12" cols="50">
                    </textarea>
                    </div>
                    <label for="noteForm">إضافة ملاحظة</label>

                </div>
            </div>
        </form>

        <div action="" class="main-container" id="main">
            <form action="" class="main-right" id="Rmain">
                <!-- Categroy Buttons -->
                <div class="category-area">
                    <button type="button" class="category" id="showAll">
                        عرض الكل
                    </button>

                    <button type="button" class="addCategory category SHFbtn" target-id="addCategoryForm">
                        <i class='bx bx-plus icon-button'></i>
                    </button>

                    <!-- added Categroies /\ -->
                </div>

                <!-- Card Buttons-->
                <div class="card-area">
                    <button type="button" class="addCard SHFbtn" target-id="addCardForm">
                        <i class='bx bx-plus-circle icon-button'></i>
                    </button>

                    <!-- added Cards /\ -->
                </div>

            </form>

            <form action="" class="main-left" id="Lmain">

                <div class="screen-reader" name="screenReader" id="screenReader">


                    <!-- bill Cards /\ -->
                </div>

                <div class="interaction-buttons">
                    <div class="label-total-area">
                        <label class="total">المجموع</label>
                        <label class="total-result">0.0₪</label>
                    </div>

                    <div class="div-control">
                        <div class="main-buttons">
                            <button type="button" class="btn-bills add-sale SHFbtn" target-id="saleForm">
                                <i>خصم</i>
                                <i class='bx bxs-offer icon'></i>
                            </button>

                            <button type="button" class="btn-bills add-note SHFbtn" target-id="noteForm">
                                <i>إضافة ملاحظة</i>
                                <i class='bx bxs-edit icon'></i>
                            </button>
                        </div>

                        <div class="sec-buttons">
                            <button type="button" class="btn-bills save-bill" target-id="billsForm">
                                <i>حفظ الفاتورة </i>
                                <i class='bx bxs-save icon'></i>
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>

    </div>

    <script src="js/script.js"></script>
    <script src="js/script-header.js"></script>
    <script src="js/script-btn-forms.js"></script>
    <script src="js/script-text-handler.js"></script>

    <script src="js/script-category-filter.js"></script>
    <script src="js/script-search.js"></script>
    <script src="js/index-bill-screen.js"></script>
    <script src="js/script-addCard.js"></script>
    <script src="js/script-addCategory.js"></script>
</body>

</html>