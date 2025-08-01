import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city-use-case'

describe('FetchPetsByCityUseCase', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let fetchPetsByCityUseCase: FetchPetsByCityUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository, orgsRepository)
  })

  it('should list all pets available in a city', async () => {
    // Criar orgs para duas cidades diferentes
    const org1 = await orgsRepository.create({
      name: 'Org São Paulo',
      email: 'sp@example.com',
      password: '123456',
      whatsapp: '99999999',
      address: 'Rua A',
      city: 'São Paulo',
    })

    const org2 = await orgsRepository.create({
      name: 'Org São Paulo 2',
      email: 'sp2@example.com',
      password: 'abcdef',
      whatsapp: '88888888',
      address: 'Rua B',
      city: 'São Paulo',
    })

    const org3 = await orgsRepository.create({
      name: 'Org Rio de Janeiro',
      email: 'rj@example.com',
      password: '987654',
      whatsapp: '77777777',
      address: 'Rua C',
      city: 'Rio de Janeiro',
    })

    // Criar pets vinculados a essas orgs
    await petsRepository.create({
      name: 'Billy',
      age: 3,
      orgId: org1.id,
    })

    await petsRepository.create({
      name: 'Molly',
      age: 2,
      orgId: org2.id,
    })

    await petsRepository.create({
      name: 'Thor',
      age: 1,
      orgId: org3.id,
    })

    // Executar use case para filtrar pets por cidade
    const result = await fetchPetsByCityUseCase.execute({
      city: 'São Paulo',
    })

    // Verificar se retornou os pets corretos
    expect(result.pets).toHaveLength(2)
    expect(result.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Billy' }),
        expect.objectContaining({ name: 'Molly' }),
      ])
    )
  })
})