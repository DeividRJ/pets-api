import { Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: {
    name: string
    age: number
    orgId: string
    description?: string | null
    size?: string | null
  }): Promise<Pet>

  findAll(): Promise<Pet[]>

  findManyByDescription(
    name?: string,
    age?: number,
    description?: string,
    size?: string
  ): Promise<Pet[]>
}