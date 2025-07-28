import { FastifyInstance } from 'fastify'
import { createPetController } from '../controllers/pets/create.pet'
import { fetchPetsByCityController } from '../controllers/pets/fetch-pets-by-city'
import { fetchPetsByDescriptionController } from '../controllers/pets/fetch-pets-by-description'
import { fetchPetDetailController } from '../controllers/pets/fetch-pets-detail'
import { getOrgWhatsappByPetIdController } from '../controllers/orgs/get-org-whatsapp-by-pet-id'
import { verifyJwt } from '../middlewares/verify-jwt'
import { verifyOrgRole } from '../middlewares/verify-org-role'

// Define as rotas relacionadas a ORGs
export async function petRoutes(app: FastifyInstance) {
    app.post('/pets', {
        preHandler: [verifyJwt, verifyOrgRole]
    }, createPetController)


    app.get('/pets:city', fetchPetsByCityController)// Exemplo: GET /pets/São Paulo
    app.get('/pets/search', fetchPetsByDescriptionController)
    app.get('/pets/:id', fetchPetDetailController)
    app.get('/pets/:id/org-whatsapp', getOrgWhatsappByPetIdController)
}