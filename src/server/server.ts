import Fastify from "fastify"
import fastifyJwt from '@fastify/jwt'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Carrega variáveis do .env para process.env
dotenv.config()

// Verifica se o JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido no .env")
}

// Decide qual URL de banco usar conforme o ambiente
const databaseUrl =
    process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_URL_TEST
        : process.env.NODE_ENV === 'development'
            ? process.env.DATABASE_URL_DEV
            : process.env.DATABASE_URL_PROD

if (!databaseUrl) {
    throw new Error("DATABASE_URL não está definida para o ambiente atual!")
}

// Instancia o Prisma com a URL correta
export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
})

// Cria a instância do Fastify
export const server = Fastify({
    logger: true,
})

// Registra o plugin JWT com o segredo do .env
server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
})