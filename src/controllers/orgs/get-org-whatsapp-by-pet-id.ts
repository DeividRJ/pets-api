import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getOrgWhatsappByPetIdController(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string().uuid()
    })

    const result = paramsSchema.safeParse(request.params)


    if (!result.success) {
        return reply.status(400).send({ error: 'ID inválido.' })
    }

    const { id } = result.data

    const pet = await prisma.pet.findUnique({
        where: { id },
        include: { Org: true },
    })


    if (!pet) {
        return reply.status(400).send({ error: 'Pet não encontrado.' })
    }

    return reply.status(200).send({
        whatsapp: pet.Org.whatsapp
    })
}