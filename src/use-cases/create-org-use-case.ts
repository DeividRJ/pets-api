import { hash } from '../utils/hash'
import { OrgsRepository } from '../repositories/interfaces/orgs-repository'

// Define o formato do input
interface CreateOrgRequest {
    name: string
    email: string
    password: string
    whatsapp: string
    address: string
    city: string
}

// Caso de uso , lógica de negócio pura.
export class CreateOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) { }



    async execute(data: CreateOrgRequest) {
        // Cria hash da senha
        const hashedPassword = await hash(data.password)

        // Cria ORG usando o repositório e retorna o objeto.
        return await this.orgsRepository.create({
            ...data,
            password: hashedPassword,
        })
    }
}