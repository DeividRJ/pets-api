import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch {
        return reply.status(400).send({error: 'Token inválido ou ausente'})
    }
}