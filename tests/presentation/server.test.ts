import { Router } from 'express'
import { Server } from '@presentation/server'
import { prisma } from '@config/postgres-db-client'
import request from 'supertest'

const PORT = 3000
const router = Router()
router.get('/ping', (_req, res) => {
    return res.json({ msg: 'pong' })
})

describe('Server class', () => {
    let server: Server

    beforeAll(() => {
        server = new Server({
            port: PORT,
            routes: router
        })
    })

    afterAll(async () => {
        await prisma.$disconnect()
        server.stop()
    })

    test('Should create Server instance', () => {
        expect(server).toBeInstanceOf(Server)
        expect(typeof server.start).toBe('function')
    })

    test('Should run Server', async () => {
        const logSpy = jest.spyOn(console, 'log')
        server.start()
        await new Promise(resolve => setTimeout(resolve, 100))
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith('Server listen on port: ', PORT)
    })

    test('/GET ping', async () => {
        const response = await request(server.getHttpServer()!).get('/ping')
        expect(response.status).toBe(200)
        expect(JSON.parse(response.text)).toEqual({ msg: 'pong' })
    })

})