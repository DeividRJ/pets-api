import { FastifyInstance } from 'fastify'
import { createOrgController } from '../controllers/orgs/create.org'
import { authenticateOrgController } from '@/controllers/orgs/authenticate-org'

// Define as rotas relacionadas a ORGs
export async function orgRoutes(app: FastifyInstance) {
    app.post('/orgs', createOrgController) // POST /orgs → criar nova ORG
}