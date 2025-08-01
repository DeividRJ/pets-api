import path from 'path'
import dotenv from 'dotenv'

// Carrega .env.test primeiro
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST

import { execSync } from 'node:child_process'
import { beforeAll, afterAll } from 'vitest'
import { prisma } from './src/lib/prisma'  // importa só depois do dotenv.config

beforeAll(async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('🚨 Rode os testes com NODE_ENV=test!')
  }

  execSync('npx prisma migrate reset --force --skip-seed', {
    stdio: 'inherit',
  })

  console.log('✅ Usando banco:', process.env.DATABASE_URL)

  await prisma.$connect()
})

afterAll(async () => {
  await prisma.$disconnect()
})