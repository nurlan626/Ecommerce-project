// Импортируем базовый URL API из модуля
import { restApiUrl } from "../../js/api.js";

(() => {
  'use strict'; // Включаем строгий режим для повышения безопасности и предотвращения ошибок

  // Получаем все формы, которые требуют проверки (с классом .needs-validation)
  const forms = document.querySelectorAll('.needs-validation');

  // Проходим по каждой форме
  Array.from(forms).forEach((form) => {
    // Навешиваем обработчик события 'submit' для каждой формы
    form.addEventListener('submit', (event) => {
      // Получаем значения из полей ввода для имени пользователя и пароля
      const username = document.querySelector(".username").value;
      const password = document.querySelector(".password").value;

      // Если форма не прошла валидацию HTML5
      if (!form.checkValidity()) {
        // Предотвращаем отправку формы
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Если форма прошла валидацию
        event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
        event.stopPropagation(); 

        // Создаём объект с данными пользователя
        const userData = { username, password };

        // Логируем URL и данные, которые отправляем
        console.log("POST " + restApiUrl + "/auth/login");

        // Отправляем POST-запрос на сервер для авторизации
        axios.post(restApiUrl + "/auth/login", userData)
          .then((response) => {
            // Если сервер вернул ответ с данными (например, токен)
            if (response.data) {
              alert("Successful login: "); // Выводим сообщение об успешном входе
              localStorage.setItem("token", response.data); // Сохраняем токен в localStorage
            } else {
              alert("Successful login"); // Выводим общее сообщение об успешном входе
            }
            // Перенаправляем пользователя на главную страницу
            window.location.href = "/index.html";
          })
          .catch((error) => {
            // Обрабатываем ошибки, возвращённые сервером
            if (error.response && error.response.data) {
              alert("Login error: " + (error.response.data.message || error.response.data)); // Ошибка с подробным сообщением
            } else if (error.request) {
              alert("Request error: No response from the server."); // Ошибка запроса, сервер не ответил
            } else {
              alert("Unknown error: " + error.message); // Любая другая ошибка
            }
          });
      }

      // Добавляем класс 'was-validated', чтобы визуализировать валидацию
      form.classList.add('was-validated');
    }, false);
  });
})();
