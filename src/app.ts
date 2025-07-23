import { server } from "./server/server";
import { orgRoutes } from "./routes/org.routes"
import { sessionsRoutes } from "./routes/sessions.routes"
import { petRoutes } from "./routes/pet.routes";

// Registra os grupos de rotas
server.register(orgRoutes)
server.register(sessionsRoutes)
server.register(petRoutes)