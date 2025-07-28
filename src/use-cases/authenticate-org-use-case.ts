import { PrismaOrgsRepository } from "../repositories/prisma/prisma-orgs-repository";
import { compare } from '../utils/hash'

// Caso de uso → login da ORG
export class AuthenticateOrgUseCase {
    constructor(private orgsRepository: PrismaOrgsRepository) { }

    async execute({ email, password }: { email: string, password: string }) {
        // Busca ORG pelo email
        const org = await this.orgsRepository.findByEmail(email)

        if (!org) {
            throw new Error('Invalid credentials') // Consistente e com a primeira letra maiúscula
        }

        // Compara senha
        const passwordMatches = await compare(password, org.password)

        if (!passwordMatches) {
            throw new Error('Invalid credentials')
        }

        return { org } // Retorna ORG para gerar JWT depois
    }
}