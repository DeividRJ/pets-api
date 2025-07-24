import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByDescriptionUseCase } from './fetch-pets-by-description'

describe('FetchPetsByDescriptionUseCase', () => {
    let petsRepository: InMemoryPetsRepository
    let fetchPetsByDescriptionUseCase: FetchPetsByDescriptionUseCase

    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        fetchPetsByDescriptionUseCase = new FetchPetsByDescriptionUseCase(petsRepository)
    })

    it('should list by description', async () => {
        // Arrange → cria alguns pets em memória
        await petsRepository.create({
            name: 'Labrador',
            age: 5,
            orgId: 'org-01',
            description: 'Marrom',
            size: 'Grande Porte'

        })


        const result = await fetchPetsByDescriptionUseCase.execute({
            name: 'Labrador',
            age: 5,
            description: 'Marrom',
            size: 'Grande Porte'
        })

        expect(result.pets).toHaveLength(1);
        expect(result.pets[0].name).toBe('Labrador');
        expect(result.pets[0].age).toBe(5);
        expect(result.pets[0].description).toBe('Marrom');
        expect(result.pets[0].size).toBe('Grande Porte');

    })
})