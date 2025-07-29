import { PetsRepository } from '../repositories/interfaces/pets-repository'
import { OrgsRepository } from '../repositories/interfaces/orgs-repository'

interface FetchPetsByCityRequest {
  city: string
}

interface FetchPetsByCityResponse {
  pets: {
    id: string
    name: string
    age: number
    orgId: string
    adopted: boolean
    description: string | null
    createdAt: Date
    size: string | null
  }[]
}

export class FetchPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({ city }: FetchPetsByCityRequest): Promise<FetchPetsByCityResponse> {
    const allPets = await this.petsRepository.findAll()

    const petsInCity = []

    for (const pet of allPets) {
      const org = await this.orgsRepository.findById(pet.orgId)
      if (org && org.city.toLowerCase() === city.toLowerCase() && !pet.adopted) {
        petsInCity.push(pet)
      }
    }

    return { pets: petsInCity }
  }
}