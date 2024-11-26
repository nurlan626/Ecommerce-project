(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Получение значений из полей формы
      const name = document.querySelector(".name").value;
      const surname = document.querySelector(".surname").value;
      const email = document.querySelector(".email").value;
      const username = document.querySelector(".username").value;
      const password = document.querySelector(".password").value;

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Остановка стандартной отправки формы
        event.stopPropagation();

        // const newUser = {
        //   name,
        //   surname,
        //   email,
        //   username,
        //   password
        // };
        const newUser = {        
          username,
          password,
          email,
        };

        axios.post("http://localhost:8080/api/auth/register", newUser)
          .then((response) => {
            console.log(response.data);
            alert("Успешная регистрация: " + response.data);
          })
          .catch((error) => {
            console.log(error);
            alert("Ошибка при регистрации: " + error.message);
          });
      }

      form.classList.add('was-validated');
    }, false);
  });
})();
