import { CreateOrgUseCase } from "./create-org-use-case";
import { afterAll, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";

// Teste unitário do caso de uso
describe.only('CreateOrgUseCase', () => {

    it.only('Should create an org with hashed password', async () => {

        const repo = new InMemoryOrgsRepository()
        const useCase = new CreateOrgUseCase(repo)

        const org = await useCase.execute({
            name: 'Test Org',
            email: 'test@example.com',
            password: '123456',
            whatsapp: '12345678',
            address: 'Rua Teste',
            city: 'Cidade do Teste'
        })

        expect(org).toBeTruthy()
        expect(org.id).toBeTruthy()
        expect(org.name).toBe('Test Org')
        expect(org.email).toBe('test@example.com')
        expect(org.password).not.toBe('123456') // o hash deve ser diferente!
        expect(org.createdAt).toBeInstanceOf(Date)
    })
})