import { CreateOrgUseCase } from "./create-org-use-case";
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";

describe('CreateOrgUseCase', () => {
  let repo: InMemoryOrgsRepository;
  let useCase: CreateOrgUseCase;

  beforeEach(() => {
    repo = new InMemoryOrgsRepository();
    useCase = new CreateOrgUseCase(repo);
  });

  it('Should create an org with hashed password', async () => {
    const org = await useCase.execute({
      name: 'Test Org',
      email: 'test@example.com',
      password: '123456',
      whatsapp: '12345678',
      address: 'Rua Teste',
      city: 'Cidade do Teste',
    });

    expect(org).toBeTruthy();
    expect(org.id).toBeTruthy();
    expect(org.name).toBe('Test Org');
    expect(org.email).toBe('test@example.com');
    expect(org.password).not.toBe('123456'); // deve estar hashiada
    expect(org.createdAt).toBeInstanceOf(Date);

    // Opcional: verificar se org está no repo
    const orgInRepo = await repo.findById(org.id);
    expect(orgInRepo).not.toBeNull();
  });
});