# Find a Friend API

API para gerenciamento de adoção de pets, onde organizações (ORGs) podem cadastrar pets para adoção, e usuários podem buscar pets disponíveis por cidade.

---

## Funcionalidades Implementadas

- [x] Cadastrar um pet
- [x] Listar todos os pets disponíveis para adoção em uma cidade
- [x] Cadastro de organizações (ORGs)
- [x] Login para organizações

## Funcionalidades em Desenvolvimento

- [x] Filtrar pets por características (idade, porte, etc.)
- [x] Visualizar detalhes de um pet para adoção
- [x] Contato via WhatsApp entre usuário e ORG
- [x] Administração para ORGs logadas

---

## Tecnologias usadas

- Node.js + TypeScript
- Fastify (API)
- Prisma (ORM)
- PostgreSQL (banco de dados)
- Vitest (testes unitários)
- Docker (para bancos de dados e ambiente)

---

## Como rodar o projeto localmente

1. Clone o repositório
2. Configure suas variáveis de ambiente (copie o `.env.example` para `.env` e ajuste)
3. Rode as migrations com `npm run migrate:dev`
4. Inicie o servidor com `npm run dev`
5. Execute testes com `npm run test`



## demais comandos :

# Desenvolvimento
npm run dev

# Criar migrations para o banco de desenvolvimento
npm run migrate:dev

# Criar migrations no banco de teste
npm run migrate:test

# Rodar testes
npm run test

# Rodar testes E2E
npm run test:e2e

# Acessar o banco via Prisma Studio
npm run studio:dev
npm run studio:test

---

## Contato

Deivid Silva — [LinkedIn](https://www.linkedin.com/in/deivid-silva-b82608368/) — [Email](deividsky2015@gmail.com)