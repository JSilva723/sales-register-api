import { prisma } from '@config/postgres-db-client'
import { Router } from 'express'

const date = new Date()
const firstDate = `${date.getFullYear()}-${date.getMonth()}-01`

const paymentQuery = `SELECT name, SUM(ammount) AS total FROM payments AS p 
INNER JOIN sales AS s ON s.payment_id = p.id
INNER JOIN items AS i ON i.sale_id = s.id
WHERE date BETWEEN $1 AND $2
GROUP BY p.id;`

const categoryQuery = `SELECT name, SUM(ammount) FROM items AS i
INNER JOIN sales AS s ON s.id = i.sale_id
INNER JOIN categories AS c ON c.id = i.category_id
WHERE date BETWEEN $1 AND $2
GROUP BY c.id;`

export class ReportRoutes {
    static get routes(): Router {
        const router = Router()

        router.get('/payment', async (req, res, next) => {
            try {
                const report = await prisma.$queryRawUnsafe(paymentQuery, new Date(firstDate), date)
                return res.json(report)
            } catch (err) {
                next(err)
            }
        })

        router.get('/category', async (req, res, next) => {
            try {
                const report = await prisma.$queryRawUnsafe(categoryQuery, new Date(firstDate), date)
                return res.json(report)
            } catch (err) {
                next(err)
            }
        })

        return router
    }
}