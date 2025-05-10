<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>

<input type="text" id="cName" />
<button id="btnCatSubmit" type="button">Send</button>

<script>
document.getElementById('btnCatSubmit').addEventListener('click', function () {
  const name = document.getElementById('cName').value;
  fetch('index-add-category.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ cName: name })
  })
  .then(res => res.json())
  .then(data => console.log("Response:", data))
  .catch(err => console.error('Error:', err));
});
</script>

</body>
</html>
