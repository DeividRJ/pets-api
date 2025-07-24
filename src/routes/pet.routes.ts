import fastify, { FastifyInstance } from 'fastify'
import { createPetController } from '../controllers/pets/create.pet'
import { fetchPetsByCityController } from '../controllers/pets/fetch-pets-by-city'
import { fetchPetsByDescriptionController } from '../controllers/pets/fetch-pets-by-description'

// Define as rotas relacionadas a ORGs
export async function petRoutes(app: FastifyInstance) {
    app.post('/pet', createPetController) // POST /pet → criar um novo pet 
    app.get('/pets', fetchPetsByCityController)// Exemplo: GET /pets/São Paulo
    app.get('/pets/description', fetchPetsByDescriptionController)
}