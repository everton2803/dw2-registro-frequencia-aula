const express = require("express");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static("public"));

let diario = JSON.parse(fs.readFileSync("diario.json"));

let longPollingClients = [];

function salvar() {
    fs.writeFileSync("diario.json", JSON.stringify(diario, null, 2));
}

wss.on("connection", ws => {
    // implementar
});

function notificar() {
    console.log("Notificando clientes...");
    console.log("Clientes WebSocket:", wss.clients.size);
    console.log("Clientes Long Polling:", longPollingClients.length);

    // implementar
}

// 🔹 Criar nova aula (data atual)
app.post("/nova-aula", (req, res) => {
    // implementar
});

// 🔹 Marcar presença
app.post("/marcar", (req, res) => {
    // implementar
});

// 🔹 Buscar dados completos
app.get("/diario", (req, res) => {
    res.json(diario);
});

// 🔹 Long polling
app.get("/long-poll", (req, res) => {
    // implementar
});

app.get("/aula-atual", (req, res) => {
    const data = new Date().toISOString().split("T")[0];
    const aula = diario.aulas ? diario.aulas.find(a => a.data === data) : null;

    res.json(aula || null);
});

app.get("/aulas", (req, res) => {
    res.json(diario.aulas);
});

app.get("/aulas/:data", (req, res) => {
    const aula = diario.aulas.find(a => a.data === req.params.data);
    res.json(aula || null);
});

app.post("/marcar-todos", (req, res) => {
    // TODO: marcar todos os alunos com o mesmo status
});

// public/professor.html
app.get("/professor", (req, res) => {
    res.sendFile(__dirname + "/public/professor.html");
});

app.get("/coordenacao-pooling", (req, res) => {
    res.sendFile(__dirname + "/public/coordenacao-pooling.html");
});

app.get("/coordenacao-long", (req, res) => {
    res.sendFile(__dirname + "/public/coordenacao-long.html");
});

app.get("/coordenacao-ws", (req, res) => {
    res.sendFile(__dirname + "/public/coordenacao-ws.html");
});

app.delete("/aula/:data", (req, res) => {
    const index = diario.aulas.findIndex(a => a.data === req.params.data);
    if (index === -1) return res.status(404).json({ erro: "Aula não encontrada" });

    diario.aulas.splice(index, 1);
    salvar();
    notificar();
    res.json({ mensagem: "Aula removida" });
});

server.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
);