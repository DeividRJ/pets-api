import { PrismaClient } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";



const prisma = new PrismaClient()


export class PrismaPetRepository implements PetsRepository {
    async create(data: { name: string; age: number; orgId: string }) {
        return prisma.pet.create({
            data: {
                name: data.name,
                age: data.age,
                Org: {
                    connect: {
                        id: data.orgId,
                    },
                },
            },
        })
    }

    async findManyByCity(city: string) {
        return prisma.pet.findMany({
            where: {
                adopted: false,
                Org: {
                    city: {
                        equals: city,
                        mode: 'insensitive', // <- faz a mágica case-insensitive
                    },
                },
            },
        })
    }
}


