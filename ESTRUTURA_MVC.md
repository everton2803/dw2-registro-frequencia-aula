# 📋 Refatoração MVC - Documentação

## ✅ Estrutura criada

O projeto foi refatorado para a arquitetura **Model-View-Controller (MVC)**:

```
projeto/
├── src/
│   ├── models/
│   │   └── Diario.js           # Model - Lógica de dados
│   │
│   ├── controllers/
│   │   └── AulaController.js   # Controller - Lógica de negócio
│   │
│   └── routes/
│       ├── aulas.routes.js     # Rotas de aulas e frequência
│       └── views.routes.js     # Rotas de views (páginas HTML)
│
├── public/                      # Views (HTML, CSS, JS)
│   ├── professor.html
│   ├── coordenacao-long.html
│   ├── coordenacao-pooling.html
│   ├── coordenacao-ws.html
│   └── styles.css
│
├── server.js                    # Principal (usa rotas e controllers)
├── package.json
├── diario.json
└── README.md
```

## 🔹 Componentes

### 1️⃣ Model: `src/models/Diario.js`
- ✅ Gerencia dados do diário (carrega/salva JSON)
- ✅ Métodos para criar/remover aulas
- ✅ Métodos para marcar/obter frequência
- ✅ Métodos para gerenciar alunos

### 2️⃣ Controller: `src/controllers/AulaController.js`
- ✅ Lógica de negócio (instancia o Model)
- ✅ Gerencia notificações (WebSocket e Long Polling)
- ✅ Processa requisições HTTP
- ✅ Coordena comunicação entre Model e Routes

### 3️⃣ Routes: `src/routes/`
- ✅ **aulas.routes.js** - Rotas da API
  - POST /nova-aula
  - POST /marcar
  - POST /marcar-todos
  - DELETE /aula/:data
  - GET /diario, /aulas, /aula-atual, etc.
  - GET /long-poll

- ✅ **views.routes.js** - Rotas de views
  - GET /professor
  - GET /coordenacao-pooling
  - GET /coordenacao-long
  - GET /coordenacao-ws

### 4️⃣ Server: `server.js`
- ✅ Limpo e organizado
- ✅ Setup do Express e WebSocket
- ✅ Importa e usa rotas
- ✅ Gerencia conexões WebSocket

## 🚀 Como usar

```bash
# Iniciar servidor em desenvolvimento
npm run dev

# Ou iniciar direto
node server.js
```

## 📝 Benefícios da refatoração

✅ **Separação de responsabilidades** - Cada camada tem seu propósito
✅ **Reutilização** - Lógica pode ser reutilizada em outras rotas
✅ **Manutenção** - Mais fácil encontrar e corrigir bugs
✅ **Testes** - Cada componente pode ser testado isoladamente
✅ **Escalabilidade** - Fácil adicionar novos controllers/models
✅ **Legibilidade** - Código mais limpo e organizado
