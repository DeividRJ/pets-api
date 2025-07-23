import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case';
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository';

// Teste unitário do caso de uso
describe('CreatePetUseCase', () => {

    let repo: InMemoryPetsRepository
    let useCase: CreatePetUseCase

    beforeEach(() => {
        repo = new InMemoryPetsRepository()
        useCase = new CreatePetUseCase(repo)
    })

    it('Should create a pet linked to an org', async () => {

        const fakeOrgId = 'org-fake-id-123'

        const result = await useCase.execute({
            name: "Billy",
            age: 8,
            orgId: fakeOrgId
        })

        expect(result.pet).toBeTruthy()
        expect(result.pet.orgId).toBe(fakeOrgId)
        expect(result.pet.name).toBe("Billy")
        expect(result.pet.age).toBe(8)
    })
})