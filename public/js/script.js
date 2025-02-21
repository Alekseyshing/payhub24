document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");
    const links = document.querySelectorAll("nav a");
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
  
    // Функция загрузки страниц (SPA-логика)
    async function loadPage(page) {
      try {
        const response = await fetch(`pages/${page}.html`);
        const content = await response.text();
        app.innerHTML = content;
      } catch (error) {
        app.innerHTML = "<h2>Ошибка загрузки страницы</h2>";
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