import { Org } from '@prisma/client'
import { OrgsRepository } from '../interfaces/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: {
    name: string
    email: string
    password: string
    whatsapp: string
    address: string
    city: string
  }): Promise<Org> {
    const org: Org = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      whatsapp: data.whatsapp,
      address: data.address,
      city: data.city,
      createdAt: new Date(),
    }

    this.items.push(org)
    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find(org => org.email === email) || null
  }

  async findById(id: string): Promise<Org | null> {
    return this.items.find(org => org.id === id) || null
  }
}