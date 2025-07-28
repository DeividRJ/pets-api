import '@fastify/jwt'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: {
            role: 'ORG' | 'ADMIN'
            sub: string
        }
        user: {
            role: 'ORG' | 'ADMIN'
            sub: string
        }
    }
}