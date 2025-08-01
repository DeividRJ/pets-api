import dotenv from 'dotenv'
import path from 'path'

// Carrega .env correto baseado no NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { prisma } from '../lib/prisma' // ajustar caminho

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido no .env")
}

const server = Fastify({ logger: true })

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
})

console.log('Conectando no banco:', process.env.DATABASE_URL)

export { server, prisma }