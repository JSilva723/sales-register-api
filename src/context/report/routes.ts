import { prisma } from '@config/postgres-db-client'
import { Router } from 'express'

function getDate() {
    const date = new Date()
    // Add one because getMonth returns the month (0 – 11) in the specified date according to local time.
    const month = date.getMonth() + 1
    // Format month
    const currentMonth = month >= 10 ? month : `0${month}`
    // Format day
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
    const firstDate = `${date.getFullYear()}-${currentMonth}-01`
    const currentDateRender = `${day}-${currentMonth}-${date.getFullYear()}`
    const firstDateRender = `01-${currentMonth}-${date.getFullYear()}`

    return { date, firstDate, currentDateRender, firstDateRender }
}

const paymentQuery = `SELECT name, SUM(ammount) AS total FROM payments AS p 
INNER JOIN sales AS s ON s.payment_id = p.id
INNER JOIN items AS i ON i.sale_id = s.id
WHERE date BETWEEN $1 AND $2
GROUP BY p.id;`

const categoryQuery = `SELECT name, SUM(ammount) AS total FROM items AS i
INNER JOIN sales AS s ON s.id = i.sale_id
INNER JOIN categories AS c ON c.id = i.category_id
WHERE date BETWEEN $1 AND $2
GROUP BY c.id;`

export class ReportRoutes {
    static get routes(): Router {
        const router = Router()

        router.get('/payment', async (req, res, next) => {
            const { date, firstDate, currentDateRender, firstDateRender } = getDate()
            const fromTo = `${firstDateRender} - ${currentDateRender}`
            try {
                const items = await prisma.$queryRawUnsafe(paymentQuery, new Date(firstDate), date)
                return res.json({ fromTo, items })
            } catch (err) {
                next(err)
            }
        })

        router.get('/category', async (req, res, next) => {
            const { date, firstDate, currentDateRender, firstDateRender } = getDate()
            const fromTo = `${firstDateRender} - ${currentDateRender}`
            try {
                const items = await prisma.$queryRawUnsafe(categoryQuery, new Date(firstDate), date)
                return res.json({ fromTo, items })
            } catch (err) {
                next(err)
            }
        })

        return router
    }
}