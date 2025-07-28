import { execSync } from 'node:child_process'
import { beforeAll, afterAll } from 'vitest'
import { prisma } from './src/lib/prisma'

beforeAll(async () => {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('🚨 Rode os testes com NODE_ENV=test!')
    }

    // Reseta o banco e aplica migrações do zero (apenas no banco teste)
    execSync('npx prisma migrate reset --force --skip-seed')

    console.log('Usando banco:', process.env.DATABASE_URL)

    await prisma.$connect()
})

afterAll(async () => {
    await prisma.$disconnect()
})

