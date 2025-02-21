const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, "public")));

// Обработчик всех маршрутов для SPA
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
