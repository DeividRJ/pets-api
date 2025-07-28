import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
// Importa o prisma singleton, ajuste o caminho conforme seu projeto
import { prisma } from '../../lib/prisma';
import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-respository";
import { CreatePetUseCase } from "../../use-cases/create-pet-use-case";

export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
    const createPetSchema = z.object({
        name: z.string(),
        age: z.number(),
    });

    const { name, age } = createPetSchema.parse(request.body);

    const user = request.user as { sub: string; role: 'ORG' | 'ADMIN' };
    const orgId = user?.sub;

    if (!orgId) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }

    const petRepository = new PrismaPetRepository(prisma);
    const createPetUseCase = new CreatePetUseCase(petRepository);

    try {
        const { pet } = await createPetUseCase.execute({
            name,
            age,
            orgId,
        });

        return reply.status(201).send({ pet });
    } catch (error) {
        console.error('❌ Erro ao criar pet:', error);
        return reply.status(500).send({ error: 'Erro interno ao criar pet' });
    }
}