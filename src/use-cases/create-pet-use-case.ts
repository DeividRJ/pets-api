import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/interfaces/pets-repository'

// Define o formato do input
interface CreatePetRequest {
    name: string
    age: number
    orgId: string
}

interface CreatePetResponse {
    pet: Pet
}


export class CreatePetUseCase {
    constructor(private petRepository: PetsRepository) { }

    async execute({
        name,
        age,
        orgId,
    }: CreatePetRequest): Promise<CreatePetResponse> {
        const pet = await this.petRepository.create({
            name,
            age,
            orgId,
        })

        return {
            pet,
        }
    }

}
