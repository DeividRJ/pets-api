import { Pet } from "@prisma/client"
import { PrismaPetRepository } from "../repositories/prisma/prisma-pet-respository";

interface FetchPetsByCityRequest {
    city: string
}

interface FetchPetsByCityResponse {
    pets: Pet[];
}




export class FetchPetsByCityUseCase {
    constructor(private petsRepository: PrismaPetRepository) { }

    async execute({
        city,
    }: FetchPetsByCityRequest): Promise<FetchPetsByCityResponse> {
        const pets = await this.petsRepository.findManyByCity(city)

        return { pets }
    }
}