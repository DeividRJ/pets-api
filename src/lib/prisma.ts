import { PrismaClient } from '@prisma/client'

// Aqui assumimos que as variáveis já foram carregadas no ambiente (ex: vitest.setup.ts ou server.ts)

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('❌ DATABASE_URL não definida!')
}

console.log('🌐 DATABASE_URL usada pelo Prisma:', databaseUrl)

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})