
import restApiUrl from "../../js/api.js";

// Функция для получения профиля пользователя
function getUserProfile() {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (token) {
        axios
            .get(`${restApiUrl}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }, // Добавляем заголовок авторизации
            })
            .then(response => {
                let user = response.data

                document.querySelector(".info").innerHTML = `
                <div class="p-4 fs-1">
                    <h3 class="text-danger fw-bold mb-3 fs-1">User Details</h3>
                    <p class="mb-1"><strong>Name:</strong> ${user.name}</p>
                    <p class="mb-1"><strong>Surname:</strong>  ${user.surname}</p>
                    <p class="mb-1"><strong>Email:</strong>  ${user.email}</p>
                    <p class="mb-1"><strong>Username:</strong>  ${user.username}</p>
                </div>
                `

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
getUserProfile();