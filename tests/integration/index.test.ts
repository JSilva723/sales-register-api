import { PrismaClient } from '@prisma/client'

describe('Database Connection', () => {
    let prisma: PrismaClient

    beforeAll(() => {
        prisma = new PrismaClient()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    test('Should establish a connection to the database', async () => {
        try {
            await prisma.$connect()
        } catch (error) {
            throw new Error('Failed to connect to the database')
        }
    })
})
