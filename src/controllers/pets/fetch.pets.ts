import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-respository";
import { FetchPetsByCityUseCase } from "../../use-cases/fetch-pets-by-city-use-case";
import { normalizeCity } from "../../utils/normalize-city";

export async function fetchPetsByCityController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const querySchema = z.object({
        city: z.string(),
    })

    let { city } = querySchema.parse(request.query);

    city = normalizeCity(city);

    const petRepository = new PrismaPetRepository();
    const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petRepository);


    const { pets } = await fetchPetsByCityUseCase.execute({ city });

    return reply.status(200).send({ pets })
}