import { prisma } from '../../lib/prisma'
import { Pet } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";

export class PrismaPetRepository implements PetsRepository {
    constructor(private prismaClient = prisma) { }

    async create(data: {
        name: string;
        age: number;
        orgId: string;
        description?: string | null;
        size?: string | null;
    }): Promise<Pet> {
        return this.prismaClient.pet.create({
            data: {
                name: data.name,
                age: data.age,
                description: data.description ?? null,
                size: data.size ?? null,
                orgId: data.orgId, // Supondo que a FK está como orgId simples e não via relação, ajuste conforme seu schema
            },
        });
    }

    async findAll(): Promise<Pet[]> {
        return this.prismaClient.pet.findMany();
    }

    async findManyByDescription(
        name?: string,
        age?: number,
        description?: string,
        size?: string
    ): Promise<Pet[]> {
        return this.prismaClient.pet.findMany({
            where: {
                adopted: false,
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