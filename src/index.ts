import { server } from './server/server'
import './app'


// Inicia o servidor escutando na porta 3333
server.listen({ port: 3333 }).then(() => {
    console.log('🚀 Server running on http://localhost:3333')
})