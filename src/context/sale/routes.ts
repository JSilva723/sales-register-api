import { prisma } from '@config/postgres-db-client'
import { Router } from 'express'

function parseDate(date: string) {
    return date.replace(/T\d\d:\d\d:\d\d.\d\d\dZ/, 'T00:00:00.000Z')
}

interface CategoryItem {
    categoryId: number
    ammount: number
}

export class SaleRoutes {
    static get routes(): Router {
        const router = Router()

        router.post('/', async (req, res, next) => {
            const sync: number[] = []
            const date = parseDate(req.body.date)
            const sales = req.body.sales

            try {
                await prisma.$transaction(async (prisma) => {
                    for (const sale of sales) {
                        await prisma.sale.create({
                            data: {
                                paymentId: sale.paymentId,
                                date,
                                items: {
                                    create: sale.items.map((category: CategoryItem) => ({
                                        categoryId: category.categoryId,
                                        ammount: category.ammount
                                    }))
                                }
                            },
                            include: {
                                items: true
                            }
                        })
                        sync.push(sale.sqliteId)
                    }
                })
                return res.json(sync)
            } catch (err) {
                next(err)
            }
        })

        return router
    }
}