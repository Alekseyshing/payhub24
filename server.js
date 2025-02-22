require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware для обработки CORS
app.use(cors());

// Middleware для обработки JSON
app.use(express.json());

// Настройка Nodemailer
const transporter = nodemailer.createTransport ({ service : "Gmail" , host : "smtp.gmail.com" , port : 465 , secure : true , auth : { user : process.env.EMAIL_USER , pass : process.env.EMAIL_PASS ,   }, });


app.post("/send-email", async (req, res) => {
    console.log("Получен запрос на /send-email", req.body); // Логирование тела запроса
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: "Новое сообщение с сайта PAYHUB24",
        text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Сообщение отправлено!" });
    } catch (error) {
        console.error("Ошибка при отправке письма:", error); // Для отладки
        res.status(500).json({ message: "Ошибка при отправке" });
    }
});


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
