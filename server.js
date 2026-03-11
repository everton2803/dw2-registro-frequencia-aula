const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

// 🔹 Importar rotas
const aulasRoutes = require("./src/routes/aulas.routes");
const viewsRoutes = require("./src/routes/views.routes");

// 🔹 Setup Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 🔹 Middlewares
app.use(express.json());
app.use(express.static("public"));

// 🔹 Armazenar WebSocket Server na app
app.set("wss", wss);

// 🔹 WebSocket Connection
wss.on("connection", ws => {
    console.log("Cliente WebSocket conectado");

    // Envia estado atual ao conectar
    const controller = aulasRoutes.getController();
    ws.send(JSON.stringify(controller.diario.getDados()));

    ws.on("close", () => {
        console.log("Cliente WebSocket desconectado");
    });

    ws.on("error", err => {
        console.error("Erro WebSocket:", err.message);
    });
});

// 🔹 Usar rotas
app.use("/", aulasRoutes);
app.use("/", viewsRoutes);

// 🔹 Iniciar servidor
server.listen(3000, () => {
    console.log("✅ Servidor rodando em http://localhost:3000");
    console.log("📁 Estrutura MVC ativada");
});