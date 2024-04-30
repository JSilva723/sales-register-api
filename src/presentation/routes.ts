import { Router } from 'express'
import { CategoryRoutes } from '@context/category/adapter/framework/routes'
import { PaymentRoutes } from '@context/payment/routes'
import { errorHandler } from './error-handler'
import { SaleRoutes } from '@context/sale/routes'
import { ReportRoutes } from '@context/report/routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        router.get('/ping', (_req, res) => {
            return res.send({ msg: 'pong' })
        })
        router.use('/category', CategoryRoutes.routes)
        router.use('/payment', PaymentRoutes.routes)
        router.use('/sales', SaleRoutes.routes)
        router.use('/report', ReportRoutes.routes)
        router.use(errorHandler)

        return router
    }
}
