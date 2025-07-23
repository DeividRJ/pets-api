import { FastifyInstance } from "fastify";
import { authenticateOrgController } from '../controllers/orgs/authenticate-org'

// Define rotas de autenticação
export async function sessionsRoutes(app: FastifyInstance) {
    app.post('/sessions', authenticateOrgController) // POST /sessions → login ORG
}