const Diario = require("../models/Diario");

class AulaController {
    constructor() {
        this.diario = new Diario();
        this.longPollingClients = [];
    }

    // 🔹 WebSocket e notificações
    getWebSocketServer() {
        return this.diario;
    }

    notificar(wss) {
        console.log("Notificando clientes...");
        console.log("Clientes WebSocket:", wss.clients.size);
        console.log("Clientes Long Polling:", this.longPollingClients.length);

        // Notifica clientes WebSocket
        wss.clients.forEach(client => {
            const WebSocket = require("ws");
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(this.diario.getDados()));
            }
        });

        // Responde clientes Long Poll
        this.longPollingClients.forEach(res => {
            try {
                res.json(this.diario.getDados());
            } catch (e) {}
        });

        this.longPollingClients = []; // Limpa a lista
    }

    addLongPollingClient(res) {
        this.longPollingClients.push(res);
    }

    removeLongPollingClient(res) {
        this.longPollingClients = this.longPollingClients.filter(r => r !== res);
    }

    // 🔹 Aulas (POST)
    criarAulaAtual(req, res, wss) {
        const data = new Date().toISOString().split("T")[0];
        const resultado = this.diario.criarAula(data);

        if (resultado.sucesso) {
            this.notificar(wss);
            return res.json(resultado);
        }

        return res.json(resultado);
    }

    removerAula(req, res, wss) {
        const { data } = req.params;
        const resultado = this.diario.removerAula(data);

        if (resultado.sucesso) {
            this.notificar(wss);
            return res.json(resultado);
        }

        return res.status(404).json(resultado);
    }

    // 🔹 Frequência (POST)
    marcarFrequencia(req, res, wss) {
        const { matricula, status } = req.body;
        const data = new Date().toISOString().split("T")[0];

        const resultado = this.diario.marcarFrequencia(matricula, status, data);

        if (resultado.sucesso) {
            this.notificar(wss);
            return res.json(resultado);
        }

        return res.status(400).json(resultado);
    }

    marcarTodosPor(req, res, wss) {
        const { status } = req.body;
        const data = new Date().toISOString().split("T")[0];

        const resultado = this.diario.marcarTodos(status, data);

        if (resultado.sucesso) {
            this.notificar(wss);
            return res.json(resultado);
        }

        return res.status(400).json(resultado);
    }

    // 🔹 Aulas (GET)
    obterDiarioCompleto(req, res) {
        res.json(this.diario.getDados());
    }

    obterAulaAtual(req, res) {
        const aula = this.diario.obterAulaAtual();
        res.json(aula || null);
    }

    obterTodas(req, res) {
        res.json(this.diario.obterTodas());
    }

    obterAulaPorData(req, res) {
        const { data } = req.params;
        const aula = this.diario.obterAulaPorData(data);
        res.json(aula || null);
    }

    // 🔹 Long Polling
    longPoll(req, res) {
        const timeout = setTimeout(() => {
            res.json({ timeout: true });
        }, 30000); // 30 segundos

        this.addLongPollingClient(res);

        req.on("close", () => {
            clearTimeout(timeout);
            this.removeLongPollingClient(res);
        });
    }
}

module.exports = AulaController;
