import fastify, { FastifyInstance } from 'fastify'
import { createPetController } from '../controllers/pets/create.pet'
import { fetchPetsByCityController } from '../controllers/pets/fetch-pets-by-city'
import { fetchPetsByDescriptionController } from '../controllers/pets/fetch-pets-by-description'
import { fetchPetDetailController } from '../controllers/pets/fetch-pets-detail'
import { getOrgWhatsappByPetIdController } from '../controllers/orgs/get-org-whatsapp-by-pet-id'

// Define as rotas relacionadas a ORGs
export async function petRoutes(app: FastifyInstance) {
    app.post('/pet', createPetController)
    app.get('/pets', fetchPetsByCityController)// Exemplo: GET /pets/São Paulo
    app.get('/pets/description', fetchPetsByDescriptionController)
    app.get('/pets/:id', fetchPetDetailController)
    app.get('/pets/:id/contact', getOrgWhatsappByPetIdController)
}