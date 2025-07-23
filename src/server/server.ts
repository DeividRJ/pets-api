import Fastify from "fastify"
import fastifyJwt from '@fastify/jwt'
import dotenv from 'dotenv'


// Carrega o .env para process.env
dotenv.config();


if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido no .env");
}


// Instância do fastify
export const server = Fastify({
    logger: true, // Ativa log padrão
})

// Registra o plugin JWT e define segredo
server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
})


