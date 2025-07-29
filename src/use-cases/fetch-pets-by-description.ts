import { PetsRepository } from '../repositories/interfaces/pets-repository'

interface FetchPetsByDescriptionRequest {
  name?: string
  age?: number
  description?: string
  size?: string
}

interface FetchPetsByDescriptionResponse {
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

export class FetchPetsByDescriptionUseCase {
  constructor(private petsRepository: PetsRepository) {}

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
      size,
    )

    return { pets }
  }
}