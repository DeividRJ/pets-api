import { Pet } from '@prisma/client'

export interface PetsRepository {
    create(data: {
        name: string
        age: number
        orgId: string
    }): Promise<Pet>

    findManyByCity(city: string): Promise<Pet[]>
}
