import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const server = () => {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.get('/ping', (req, res) => {
        res.send({ msg: 'pong' })
    })

    app.post('/category', async (req, res) => {
        const { name } = req.body

        const category = await prisma.category.create({
            data: {
                name,
            },
        })

        res.send(category)
    })

    app.get('/category', async (req, res) => {
        const categories = await prisma.category.findMany()
        res.send(categories)
    })

    app.post('/payment', async (req, res) => {
        const { name } = req.body

        const payment = await prisma.payment.create({
            data: {
                name,
            },
        })

        res.send(payment)
    })

    app.get('/payment', async (req, res) => {
        const payments = await prisma.payment.findMany()
        res.send(payments)
    })

    return app
}