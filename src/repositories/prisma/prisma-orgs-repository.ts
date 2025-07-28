import { prisma } from '../../lib/prisma'
import { OrgsRepository } from '../interfaces/orgs-repository'

// Repositório Prisma para ORGs
export class PrismaOrgsRepository implements OrgsRepository {
    async create(data: {
        name: string,
        email: string,
        password: string,
        whatsapp: string,
        address: string,
        city: string,

    }) {
        // Cria ORG no banco
        return prisma.org.create({
            data,
        })
    }

    async findByEmail(email: string) {
        // Busca ORG pelo email
        return prisma.org.findUnique({
            where: { email },
        })
    }
}