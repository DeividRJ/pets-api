import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByDescriptionUseCase } from './fetch-pets-by-description'
import { PetsRepository } from '../repositories/interfaces/pets-repository'

describe('FetchPetsByDescriptionUseCase', () => {
  let petsRepository: PetsRepository
  let fetchPetsByDescriptionUseCase: FetchPetsByDescriptionUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    fetchPetsByDescriptionUseCase = new FetchPetsByDescriptionUseCase(petsRepository)
  })

  it('should list pets matching all description filters', async () => {
    await petsRepository.create({
      name: 'Labrador',
      age: 5,
      orgId: 'org-01',
      description: 'Marrom',
      size: 'Grande Porte',
    })

    const result = await fetchPetsByDescriptionUseCase.execute({
      name: 'Labrador',
      age: 5,
      description: 'Marrom',
      size: 'Grande Porte',
    })

    expect(result.pets).toHaveLength(1)
    expect(result.pets[0].name).toBe('Labrador')
    expect(result.pets[0].age).toBe(5)
    expect(result.pets[0].description).toBe('Marrom')
    expect(result.pets[0].size).toBe('Grande Porte')
  })

  it('should list pets when filtering only by some fields', async () => {
    await petsRepository.create({
      name: 'Golden Retriever',
      age: 3,
      orgId: 'org-02',
      description: 'Amarelo',
      size: 'Grande Porte',
    })

    await petsRepository.create({
      name: 'Golden Retriever',
      age: 3,
      orgId: 'org-03',
      description: 'Branco',
      size: 'Médio Porte',
    })

    // Filtro só pelo nome e idade
    const result = await fetchPetsByDescriptionUseCase.execute({
      name: 'Golden',
      age: 3,
    })

    expect(result.pets.length).toBe(2)
    expect(result.pets.every(p => p.name.includes('Golden'))).toBe(true)
    expect(result.pets.every(p => p.age === 3)).toBe(true)
  })
})