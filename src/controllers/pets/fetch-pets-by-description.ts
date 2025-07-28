import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
// Importa prisma singleton, ajuste caminho se necessário
import { prisma } from '../../lib/prisma';
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-respository';
import { FetchPetsByDescriptionUseCase } from '../../use-cases/fetch-pets-by-description';
import { normalizeFetchPets } from '../../utils/normalize-fetch-pets';

export async function fetchPetsByDescriptionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const querySchema = z.object({
    name: z.string().optional(),
    age: z.coerce.number().optional(),
    description: z.string().optional(),
    size: z.string().optional(),
  });

  const { name, age, description, size } = querySchema.parse(request.query);

  const filters = normalizeFetchPets(name, description, size);

  const petsRepository = new PrismaPetRepository(prisma);
  const fetchPetsByDescriptionUseCase = new FetchPetsByDescriptionUseCase(petsRepository);

  const { pets } = await fetchPetsByDescriptionUseCase.execute({
    ...filters,
    age,
  });

  return reply.status(200).send({ pets });
}