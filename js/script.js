// Функция для получения профиля пользователя
function fetchUserProfile() {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (token) {
        axios
            .get('http://localhost:8080/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }, // Добавляем заголовок авторизации
            })
            .then(response => {
                console.log('User Profile:', response.data); // Обрабатываем успешный ответ
                showInProfileMenu(response.data);
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

// Вызов функции для получения профиля при загрузке страницы
fetchUserProfile();
