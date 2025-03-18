document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");
    const links = document.querySelectorAll("nav a");
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    const logo = document.querySelector(".logo");

    // if (logo) {
    //     logo.addEventListener("click", function () {
    //         window.location.href = "/home";
    //     });
    // }

    // Функция загрузки страниц (SPA-логика)
    async function loadPage(page) {
        try {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) {
                throw new Error("Ошибка загрузки страницы");
            }
            const content = await response.text();
            app.innerHTML = content;

            // Если загружена страница "contact", добавляем обработчик отправки формы
            if (page === "contact") {
                const contactForm = document.getElementById("contactForm");
                if (contactForm) {
                    contactForm.addEventListener("submit", handleSubmit);
                }
            }
        } catch (error) {
            app.innerHTML = "<h2>Ошибка загрузки страницы</h2>";
        }
    }

    // Обработчик отправки формы
    async function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            alert("Ошибка отправки сообщения");
        }
    }

    // Обработчик кликов по навигационным ссылкам
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");
            window.history.pushState({ page }, "", `#${page}`);
            loadPage(page);

            // Закрываем меню и возвращаем прокрутку
            if (nav.classList.contains("nav-active")) {
                nav.classList.remove("nav-active");
                burger.classList.remove("toggle");
                document.body.classList.remove("no-scroll");
            }
        });
    });

    // Обработчик истории браузера (назад/вперед)
    window.addEventListener("popstate", function (event) {
        if (event.state) {
            loadPage(event.state.page);
        }
    });

    // Загружаем стартовую страницу
    const startPage = window.location.hash ? window.location.hash.substring(1) : "home";
    loadPage(startPage);

    // Бургер-меню: открытие/закрытие
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        burger.classList.toggle("toggle");
        document.body.classList.toggle("no-scroll");
    });
});
