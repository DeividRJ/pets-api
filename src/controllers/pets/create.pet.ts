import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-respository";
import { CreatePetUseCase } from "../../use-cases/create-pet-use-case";


// Controller → recebe a requisição HTTP e orquestra
export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
    // Validação do body usando Zod
    const createPetSchema = z.object({
        name: z.string(),
        age: z.number(),
        orgId: z.string(),
    })

    // Faz parse e valida
    const { name, age, orgId } = createPetSchema.parse(request.body)

    // Cria instância do repositório e do caso de uso
    const petRepository = new PrismaPetRepository()
    const createPetUseCase = new CreatePetUseCase(petRepository)

    // Executa o caso de uso
    await createPetUseCase.execute({
        name,
        age,
        orgId,
    })

    return reply.status(201).send()
}

