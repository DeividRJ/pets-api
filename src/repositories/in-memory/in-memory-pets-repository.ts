import { Pet } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async create(data: { name: string; age: number; orgId: string }) {
        const pet: Pet = {
            id: crypto.randomUUID(),
            name: data.name,
            age: data.age,
            orgId: data.orgId,
            adopted: false,
            description: null,
            createdAt: new Date(),
            size: null,
        }

        this.items.push(pet)

        return pet
    }

    async findManyByCity(city: string): Promise<Pet[]> {
        // Filtra pets não adotados, vinculados a uma ORG da cidade
        return this.items.filter((pet) => {
            // Supõe que armazena o pet no org ou armazena o city no pet.
            // Se não tiver, use city fixo na simulação:
            return pet.adopted === false
        })
    }
}