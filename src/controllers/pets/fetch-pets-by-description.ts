import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-respository';
import { FetchPetsByDescriptionUseCase } from '../../use-cases/fetch-pets-by-description';
import { normalizeFetchPets } from '../../utils/normalize-fetch-pets';

export async function fetchPetsByDescriptionController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    // Valida a query com zod
    const querySchema = z.object({
        name: z.string().optional(),
        age: z.coerce.number().optional(),  // coerce converte string pra number
        description: z.string().optional(),
        size: z.string().optional(),
    });

    const { name, age, description, size } = querySchema.parse(request.query);

    // Normaliza só os campos de texto
    const filters = normalizeFetchPets(name, description, size);

    const petsRepository = new PrismaPetRepository();
    const fetchPetsByDescriptionUseCase = new FetchPetsByDescriptionUseCase(petsRepository);

    const { pets } = await fetchPetsByDescriptionUseCase.execute({
        ...filters,
        age, // já está coerced como number ou undefined
    });

    return reply.status(200).send({ pets });
}