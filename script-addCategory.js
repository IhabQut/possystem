
document.getElementById('btnCatSubmit').addEventListener('click', function () {
  const cName = document.getElementById('cName').value.trim();
  if (!cName) {
    alert('يرجى إدخال اسم التصنيف');
    return;
  }


  fetch('../POS-SYSTEM/php/index-add-category.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ cName })
  })
    .then(res => res.text())
    .then(response => {
      if (response.trim() === 'success') {

        document.querySelector('.addCategoryForm').style.display = "none";
        document.querySelector('.btn-forms').style.display = "none";
        const categoryArea = document.querySelector('.category-area');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'category category-select';
        button.textContent = cName;
        button.value = cName;
        categoryArea.appendChild(button);

        const selectIds = ['Associated_cName', 'Associated_cName_update'];
        const cName = document.getElementById('cName').value;

        selectIds.forEach(id => {
          const select = document.getElementById(id);
          const option = document.createElement('option');
          option.value = cName;
          option.textContent = cName;
          select.appendChild(option.cloneNode(true));
        });

        // Clear the input
        document.getElementById('cName').value = '';

        

      } else if (response.trim() === 'duplicate') {
        alert('هذه الفئة موجودة بالفعل');
      } else {
        alert('حدث خطأ: ' + response);
      }
    });
    window.location.reload();
});




window.addEventListener("DOMContentLoaded", () => {

  fetch('php/index-get-categories.php')
    .then(response => response.json())
    .then(categories => {
      const categoryArea = document.querySelector('.category-area');

      categories.forEach(cName => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'category category-select';
        button.textContent = cName;
        button.value = cName;
        categoryArea.appendChild(button);
      });

      const selectIds = ['Associated_cName', 'Associated_cName_update'];

      selectIds.forEach(id => {
        const select = document.getElementById(id);
        categories.forEach(cName => {
          const option = document.createElement('option');
          option.value = cName;
          option.textContent = cName;
          select.appendChild(option.cloneNode(true));
        });
      });

    })
    .catch(error => {
      console.error('Error loading categories:', error);
    });

});





