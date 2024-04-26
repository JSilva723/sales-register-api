import { Router } from 'express'
import { Server } from '@presentation/server'

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

    afterAll(() => {
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
})