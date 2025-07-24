import { Pet } from "@prisma/client"
import { PrismaPetRepository } from "../repositories/prisma/prisma-pet-respository";

interface FetchPetsByDescriptionRequest {
    name?: string,
    age?: number,
    description?: string
    size?: string
}

interface FetchPetsByDescriptionResponse {
    pets: Pet[];
}




export class FetchPetsByDescriptionUseCase {
    constructor(private petsRepository: PrismaPetRepository) { }

    async execute({
        name,
        age,
        description,
        size,
    }: FetchPetsByDescriptionRequest): Promise<FetchPetsByDescriptionResponse> {
        const pets = await this.petsRepository.findManyByDescription(
            name,
            age,
            description,
            size)

        return { pets }
    }
}