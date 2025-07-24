import { Pet } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async create(data: {
        name: string;
        age: number;
        orgId: string;
        description?: string | null;
        size?: string | null;
    }): Promise<Pet> {
        const pet: Pet = {
            id: crypto.randomUUID(),
            name: data.name,
            age: data.age,
            orgId: data.orgId,
            adopted: false,
            description: data.description ?? null,
            createdAt: new Date(),
            size: data.size ?? null,
        };

        this.items.push(pet);

        return pet;
    }

    async findManyByCity(city: string): Promise<Pet[]> {
        // Filtra pets não adotados, vinculados a uma ORG da cidade
        return this.items.filter((pet) => {
            // Supõe que armazena o pet no org ou armazena o city no pet.
            // Se não tiver, use city fixo na simulação:
            return pet.adopted === false
        })
    }

    async findManyByDescription(
        name?: string,
        age?: number,
        description?: string,
        size?: string
    ): Promise<Pet[]> {
        return this.items.filter((pet) => {
            if (pet.adopted) return false;

            if (name && !pet.name.toLowerCase().includes(name.toLowerCase())) {
                return false;
            }

            if (age && pet.age !== age) {
                return false;
            }

            if (description && !(pet.description ?? '').toLowerCase().includes(description.toLowerCase())) {
                return false;
            }

            if (size && (pet.size ?? '').toLowerCase() !== size.toLowerCase()) {
                return false;
            }

            return true;
        });
    }

}