# Find a Friend API

API para gerenciamento de adoção de pets, onde organizações (ORGs) podem cadastrar pets para adoção, e usuários podem buscar pets disponíveis por cidade.

---

## Funcionalidades Implementadas

- [x] Cadastrar um pet
- [x] Listar todos os pets disponíveis para adoção em uma cidade
- [x] Cadastro de organizações (ORGs)
- [x] Login para organizações

## Funcionalidades em Desenvolvimento

- [ ] Filtrar pets por características (idade, porte, etc.)
- [ ] Visualizar detalhes de um pet para adoção
- [ ] Contato via WhatsApp entre usuário e ORG
- [ ] Administração para ORGs logadas

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

---

## Contato

Deivid Silva — [LinkedIn](https://www.linkedin.com/in/deivid-silva-b82608368/) — [Email](deividsky2015@gmail.com)