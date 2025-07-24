import { Pet, PrismaClient } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";
import { string } from "zod";



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

    async findManyByDescription(
        name?: string,
        age?: number,
        description?: string,
        size?: string
    ): Promise<Pet[]> {
        return prisma.pet.findMany({
            where: {
                ...(name && {
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    },
                }),
                ...(age && { age }),
                ...(description && {
                    description: {
                        contains: description,
                        mode: 'insensitive',
                    },
                }),
                ...(size && {
                    size: {
                        equals: size,
                        mode: 'insensitive',
                    },
                }),
            },
        });
    }
}


