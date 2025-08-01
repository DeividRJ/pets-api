import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
// importar prisma singleton
import { prisma } from "../../lib/prisma";
import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-respository";
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { FetchPetsByCityUseCase } from "../../use-cases/fetch-pets-by-city-use-case";
import { normalizeCity } from "../../utils/normalize-city";

export async function fetchPetsByCityController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const querySchema = z.object({
        city: z.string(),
    });

    let { city } = querySchema.parse(request.query);
    city = normalizeCity(city);

    const petRepository = new PrismaPetRepository(prisma);
    const orgsRepository = new PrismaOrgsRepository();  // <-- sem parâmetro

    const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petRepository, orgsRepository);

    const { pets } = await fetchPetsByCityUseCase.execute({ city });

    return reply.status(200).send({ pets });
}