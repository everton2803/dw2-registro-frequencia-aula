const fs = require("fs");
const path = require("path");

class Diario {
    constructor(filePath = "./diario.json") {
        this.filePath = filePath;
        this.dados = this.carregar();
    }

    carregar() {
        try {
            const conteudo = fs.readFileSync(this.filePath, "utf8");
            return JSON.parse(conteudo);
        } catch (erro) {
            console.error("Erro ao carregar diário:", erro);
            return {};
        }
    }

    salvar() {
        try {
            fs.writeFileSync(
                this.filePath,
                JSON.stringify(this.dados, null, 2),
                "utf8"
            );
        } catch (erro) {
            console.error("Erro ao salvar diário:", erro);
        }
    }

    getDados() {
        return this.dados;
    }

    // 🔹 Aulas
    criarAula(data) {
        if (!this.dados.aulas) this.dados.aulas = [];

        const aulaExistente = this.dados.aulas.find(a => a.data === data);
        if (aulaExistente) {
            return { sucesso: false, mensagem: "Aula já existe" };
        }

        this.dados.aulas.push({ data, presencas: {} });
        this.salvar();
        return { sucesso: true, mensagem: "Aula criada", data };
    }

    obterAulaAtual() {
        const data = new Date().toISOString().split("T")[0];
        return this.dados.aulas
            ? this.dados.aulas.find(a => a.data === data)
            : null;
    }

    obterAulaPorData(data) {
        if (!this.dados.aulas) return null;
        return this.dados.aulas.find(a => a.data === data);
    }

    obterTodas() {
        return this.dados.aulas || [];
    }

    removerAula(data) {
        if (!this.dados.aulas) {
            return { sucesso: false, mensagem: "Nenhuma aula registrada" };
        }

        const index = this.dados.aulas.findIndex(a => a.data === data);
        if (index === -1) {
            return { sucesso: false, mensagem: "Aula não encontrada" };
        }

        this.dados.aulas.splice(index, 1);
        this.salvar();
        return { sucesso: true, mensagem: "Aula removida" };
    }

    // 🔹 Frequência
    marcarFrequencia(matricula, status, data = null) {
        if (!data) {
            data = new Date().toISOString().split("T")[0];
        }

        let aula = this.obterAulaPorData(data);
        if (!aula) {
            return { sucesso: false, erro: "Aula não encontrada. Crie primeiro a aula." };
        }

        aula.presencas[matricula] = status;
        this.salvar();
        return { sucesso: true, ok: true };
    }

    marcarTodos(status, data = null) {
        if (!data) {
            data = new Date().toISOString().split("T")[0];
        }

        let aula = this.obterAulaPorData(data);
        if (!aula) {
            return { sucesso: false, erro: "Aula não encontrada. Crie primeiro a aula." };
        }

        if (!this.dados.alunos || this.dados.alunos.length === 0) {
            return { sucesso: false, erro: "Nenhum aluno registrado" };
        }

        this.dados.alunos.forEach(aluno => {
            aula.presencas[aluno.matricula] = status;
        });

        this.salvar();
        return { sucesso: true, ok: true, marcados: this.dados.alunos.length };
    }

    // 🔹 Alunos
    obterAlunos() {
        return this.dados.alunos || [];
    }

    obterAlunosPorMatricula(matriculas) {
        if (!this.dados.alunos) return [];
        return this.dados.alunos.filter(a => matriculas.includes(a.matricula));
    }
}

module.exports = Diario;
