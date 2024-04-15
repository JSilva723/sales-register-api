import { Router } from 'express'
import { CategoryRoutes } from './context/category/routes'
import { PaymentRoutes } from './context/payment/routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        router.get('/ping', (_req, res) => {
            return res.send({ msg: 'pong' })
        })
        router.use('/category', CategoryRoutes.routes)
        router.use('/payment', PaymentRoutes.routes)

        return router
    }
}
