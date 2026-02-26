# Atividade Prática — Comunicação Cliente-Servidor

### Objetivo

Desenvolver uma aplicação web que utilize **uma estratégia de comunicação em tempo real**, aplicando um dos seguintes conceitos:

* HTTP Polling
* Long Polling
* WebSocket

Cada aluno deverá **escolher pelo menos uma estratégia** e aplicá-la em seu projeto.

### Descrição

Você deverá criar uma aplicação web simulando uma situação real do dia a dia de:

* uma empresa
* uma escola
* um comércio
* uma clínica
* uma startup
* um sistema interno organizacional

A aplicação deve exigir **atualizações frequentes de dados**, justificando o uso de uma das três estratégias de comunicação.

## Temas Sugeridos (Escolher 1)

### Ambiente Escolar

1. Sistema de chamada em tempo real (presença de alunos)
2. Mural de avisos da turma
3. Diário de classe com atualização automática
4. Chat entre professor e alunos
5. Painel de notas liberadas

### Ambiente Empresarial

6. Painel de tarefas (estilo Kanban simples)
7. Sistema de chamados internos (TI)
8. Monitoramento de status de pedidos
9. Chat interno corporativo
10. Dashboard de vendas em tempo real

### Clínica / Atendimento

11. Painel de senhas de atendimento
12. Fila de espera digital
13. Status de exames
14. Controle de atendimento médico

### Comércio

15. Painel de pedidos recebidos
16. Controle de estoque em tempo real
17. Acompanhamento de entregas

### Outros

18. Rastreamento de entregador
19. Sistema de votação em tempo real
20. Jogo simples multiplayer (ex: placar ao vivo)
21. Outro (sugira um tema e justifique)

## Requisitos Técnicos

### Backend

* Node.js com Express
* Estrutura de API organizada
* Dados armazenados em:

  * JSON local **ou**
  * variável em memória

### Frontend

* HTML + CSS + JavaScript
* Uso de `fetch()` para HTTP, ou outra biblioteca similar
* Uso de WebSocket quando for o caso

## Requisitos Específicos por Estratégia

### Se escolher HTTP Polling

* Cliente deve consultar o servidor automaticamente a cada X segundos
* Usar `setInterval()`
* Justificar no relatório por que polling é adequado ao seu sistema

### Se escolher Long Polling

* Servidor deve manter requisição aberta até haver atualização
* Cliente deve reconectar após resposta
* Controlar timeout corretamente
* Implementar lista de clientes conectados

### Se escolher WebSocket

* Criar servidor WebSocket
* Permitir múltiplos clientes conectados
* Atualização deve ser instantânea
* Implementar broadcast de mensagens/dados

### 📄 Relatório (obrigatório)

Explique:

1. Qual estratégia escolheu
2. Por que ela é adequada ao seu sistema
3. Diferença entre as três abordagens
4. Vantagens e desvantagens da escolhida
5. Quando você NÃO usaria essa estratégia

## Critérios de Avaliação

| Critério                   | Peso |
| -------------------------- | ---- |
| Funcionamento correto      | 3,0  |
| Uso adequado da estratégia | 2,0  |
| Organização do código      | 2,0  |
| Interface funcional        | 1,0  |
| Relatório técnico          | 2,0  |

Total: **10,0 pontos**

## Desafios Extras (Bônus)

* Implementar autenticação simples
* Registrar logs de conexão
* Permitir múltiplos usuários simultâneos
* Criar indicador visual de status de conexão
* Comparar desempenho entre duas estratégias

## Entrega

* Código-fonte organizado
* Arquivo README com instruções de execução
* Relatório em PDF
* Apresentação prática em sala (5 minutos)