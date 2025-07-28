import { prisma } from '../../lib/prisma'
import { Pet } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";

export class PrismaPetRepository implements PetsRepository {
    constructor(private prismaClient = prisma) { }

    async create(data: { name: string; age: number; orgId: string }) {
        return this.prismaClient.pet.create({
            data: {
                name: data.name,
                age: data.age,
                Org: {
                    connect: {
                        id: data.orgId,
                    },
                },
            },
        });
    }

    async findManyByCity(city: string) {
        return this.prismaClient.pet.findMany({
            where: {
                adopted: false,
                Org: {
                    city: {
                        equals: city,
                        mode: 'insensitive',
                    },
                },
            },
        });
    }

    async findManyByDescription(
        name?: string,
        age?: number,
        description?: string,
        size?: string
    ): Promise<Pet[]> {
        return this.prismaClient.pet.findMany({
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