import { envs } from './config/envs'
import { prisma } from './config/postgres-db-client'
import { Server } from './server'
import { AppRoutes } from './routes'

async function main() {
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    server.start()
}

(() => {
    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e) // eslint-disable-line no-console
            await prisma.$disconnect()
            process.exit(1)
        })
})()