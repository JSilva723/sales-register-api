import { envs } from './config/envs'
import { prisma } from './config/postgres-db-client'
import { Server } from './presentation/server'
import { AppRoutes } from './presentation/routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
    return this.toString()
}

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