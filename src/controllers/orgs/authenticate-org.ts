import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from '../../use-cases/authenticate-org-use-case';

type JwtRole = "ORG" | "ADMIN";

export async function authenticateOrgController(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const { email, password } = schema.parse(request.body);

    const orgsRepository = new PrismaOrgsRepository();
    const authenticateOrg = new AuthenticateOrgUseCase(orgsRepository);

    const { org } = await authenticateOrg.execute({ email, password });

    const role = org.role.toString() as JwtRole;

    const token = request.server.jwt.sign({
        role,
        sub: org.id,
    }, {
        expiresIn: '1d',
    });

    return reply.send({ token });
}