const express = require("express");
const AulaController = require("../controllers/AulaController");

const router = express.Router();

// Instancia o controller
const aulasController = new AulaController();

// Função para exportar o controller (usada no server.js para acessar notificações e dados)
router.getController = () => aulasController;

// 🔹 POST - Criar nova aula (data atual)
router.post("/nova-aula", (req, res) => {
    const wss = req.app.get("wss");
    aulasController.criarAulaAtual(req, res, wss);
});

// 🔹 DELETE - Remover aula por data
router.delete("/aula/:data", (req, res) => {
    const wss = req.app.get("wss");
    aulasController.removerAula(req, res, wss);
});

// 🔹 POST - Marcar frequência individual
router.post("/marcar", (req, res) => {
    const wss = req.app.get("wss");
    aulasController.marcarFrequencia(req, res, wss);
});

// 🔹 POST - Marcar todos os alunos
router.post("/marcar-todos", (req, res) => {
    const wss = req.app.get("wss");
    aulasController.marcarTodosPor(req, res, wss);
});

// 🔹 GET - Obtér diário completo
router.get("/diario", (req, res) => {
    aulasController.obterDiarioCompleto(req, res);
});

// 🔹 GET - Obter aula atual (hoje)
router.get("/aula-atual", (req, res) => {
    aulasController.obterAulaAtual(req, res);
});

// 🔹 GET - Obter todas as aulas
router.get("/aulas", (req, res) => {
    aulasController.obterTodas(req, res);
});

// 🔹 GET - Obter aula específica por data
router.get("/aulas/:data", (req, res) => {
    aulasController.obterAulaPorData(req, res);
});

// 🔹 GET - Long polling
router.get("/long-poll", (req, res) => {
    aulasController.longPoll(req, res);
});

module.exports = router;
