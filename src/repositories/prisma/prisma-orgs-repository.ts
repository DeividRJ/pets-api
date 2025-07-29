import { prisma } from '../../lib/prisma'
import { OrgsRepository } from '../interfaces/orgs-repository'
import { Org } from '@prisma/client'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: {
    name: string,
    email: string,
    password: string,
    whatsapp: string,
    address: string,
    city: string,
  }): Promise<Org> {
    return prisma.org.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Org | null> {
    return prisma.org.findUnique({
      where: { email },
    })
  }

  async findById(id: string): Promise<Org | null> {
    return prisma.org.findUnique({
      where: { id },
    })
  }
}