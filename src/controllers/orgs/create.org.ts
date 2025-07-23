import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "../../use-cases/create-org-use-case";


// Controller → recebe a requisição HTTP e orquestra
export async function createOrgController(request: FastifyRequest, reply: FastifyReply) {
    // Validação do body usando Zod
    const createOrgSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        whatsapp: z.string(),
        address: z.string(),
        city: z.string(),
    })

    // Faz parse e valida
    const { name, email, password, whatsapp, address, city } = createOrgSchema.parse(request.body)

    // Cria instância do repositório e do caso de uso
    const orgsRepository = new PrismaOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    // Executa o caso de uso
    await createOrgUseCase.execute({
        name,
        email,
        password,
        whatsapp,
        address,
        city,
    })

    return reply.status(201).send()
}

