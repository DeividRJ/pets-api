import { Pet } from "@prisma/client"
import { PrismaPetRepository } from "../repositories/prisma/prisma-pet-respository";

interface fetchPetsByCityRequest {
    city: string
}

interface fetchPetsByCityResponse {
    pets: Pet[];
}




export class FetchPetsByCityUseCase {
    constructor(private petsRepository: PrismaPetRepository) { }

    async execute({
        city,
    }: fetchPetsByCityRequest): Promise<fetchPetsByCityResponse> {
        const pets = await this.petsRepository.findManyByCity(city)

        return { pets }
    }
}