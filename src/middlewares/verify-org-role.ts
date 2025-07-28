import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyOrgRole(request: FastifyRequest, reply: FastifyReply) {
    // Faz cast de request.user para o tipo correto
    const user = request.user as { role: 'ORG' | 'ADMIN'; sub: string };

    if (!user || user.role !== 'ORG') {
        return reply.status(403).send({ error: "Forbidden: Only ORG role allowed" });
    }
}