import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from '../../use-cases/authenticate-org-use-case'


// Controller → faz login da ORG
export async function authenticateOrgController(request: FastifyRequest, reply: FastifyReply) {
    // Validação com Zod
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const { email, password } = schema.parse(request.body)

    const orgsRepository = new PrismaOrgsRepository()
    const authenticateOrg = new AuthenticateOrgUseCase(orgsRepository)

    const { org } = await authenticateOrg.execute({ email, password })

    // Gera JWT usando o plugin do Fastify
    const token = request.server.jwt.sign({ orgId: org.id })

    return reply.send({ token }) // Retorna o token para o cliente

}


