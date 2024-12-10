import restApiUrl from "../../js/api.js";

// Функция для получения профиля пользователя
function fetchUserProfile() {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (token) {
        axios
            .get(`${restApiUrl}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }, // Добавляем заголовок авторизации
            })
            .then(response => {
                showInProfileMenu(response.data);
                localStorage.setItem("user", JSON.stringify(response.data))
            })
            .catch(error => {
                if (error.response) {
                    console.error('Ошибка сервера:', error.response.data); // Ошибка от сервера
                } else {
                    console.error('Сетевая ошибка:', error.message); // Ошибка сети или другая проблема
                }
            });
    } else {
        alert("No profile available");
        showOutOfProfileMenu(); // Показать меню для незарегистрированного пользователя
    }
}

// Функция для выхода из аккаунта
function logoutUser() {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (token) {
        axios
            .post('http://localhost:8080/api/auth/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                console.log('Logout successful!');
                localStorage.removeItem('token'); // Удаляем токен
                window.location.href = '/index.html'; // Перенаправляем на страницу входа
            })
            .catch(error => {
                console.error('Ошибка при выходе:', error.response ? error.response.data : error.message);
            });
    } else {
        console.log('No token found, user might already be logged out');
    }
}

// Функция для отображения меню профиля
function showInProfileMenu(data) {
    console.log(data)
    const profileMenu = document.querySelector(".profileMenu");
    profileMenu.innerHTML = `
        <a href="/pages/cart/cart.html">
            <i class="bi bi-cart3 fs-2 mx-3"></i>
        </a>
        <a href="/pages/profile/profile.html">
            <i class="bi bi-person-circle fs-2"></i>
        </a>
        <span class="username">
            ${data.username}
        </span>
        <span class="logoutBtn btn btn-danger">
            Log out
        </span>
    `;
    const logoutBtn = document.querySelector(".logoutBtn");
    logoutBtn.addEventListener("click", logoutUser)
}

// Функция для отображения меню для незарегистрированных пользователей
function showOutOfProfileMenu() {
    const profileMenu = document.querySelector(".profileMenu");
    profileMenu.innerHTML = `
        <a class="nav-link" href="/pages/login/login.html">
            Log in
        </a>
    `;
}

function showHeader() {
    const header = document.createElement("header");  // Создаем элемент <header>
    header.innerHTML = `
<header class=" container">
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <a class="navbar-brand" href="/index.html">Exclusive</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>

            <li class="nav-item">
              <a class="nav-link">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pages/registration/registration.html">Sign up</a>
            </li>
            <li class="nav-item">
              <a href="/pages/shop/shop.html" class="btn btn-dark text-danger">Shop</a>
            </li>
          </ul>
          <form class="d-flex " role="search">
            <div class="d-flex border mx-2 px-1 rounded ">
              <input class="form-control me-2  border-0" type="search" placeholder="What are you looking for?"
                aria-label="Search">
              <i class="bi bi-search fs-2"></i>
            </div>
          </form>
          <div class="mx-3 profileMenu d-flex gap-2 align-items-center ">
            <a href="/pages/cart/cart.html">
              <i class="bi bi-cart3 fs-2 mx-3"></i>
            </a>
            <a href="/pages/profile/profile.html">
              <i class="bi bi-person-circle fs-2"></i>
            </a>
            <span class="username">
            </span>
          </div>
        </div>
      </div>
    </nav>
 </header> 
    
    `;  // Устанавливаем текст в <header>
    document.body.insertBefore(header, document.body.firstChild);  // Вставляем <header> в начало <body>
}
function showFooter() {
    const footer = document.createElement("footer");  // Создаем элемент <footer>
    footer.innerHTML = `
        <footer class="container">
            footer
        </footer> 
    `;  // Устанавливаем содержимое для <footer>
    document.body.appendChild(footer);  // Добавляем <footer> в конец <body>
}


showHeader();
showFooter();
fetchUserProfile();
