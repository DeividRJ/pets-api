import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

// Carrega o .env correto conforme NODE_ENV (padrão: .env)
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

const databaseUrl =
    process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_URL_TEST
        : process.env.NODE_ENV === 'development'
            ? process.env.DATABASE_URL_DEV
            : process.env.DATABASE_URL_PROD

if (!databaseUrl) {
    throw new Error('DATABASE_URL não definida para o ambiente atual!')
}

console.log('🌐 DATABASE_URL usada pelo Prisma:', databaseUrl)

export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
})


