import { Org } from '@prisma/client'

export interface OrgsRepository {
  create(data: {
    name: string
    email: string
    password: string
    whatsapp: string
    address: string
    city: string
  }): Promise<Org>

  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
}