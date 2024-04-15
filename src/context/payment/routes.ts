import { Router } from 'express'
import { PaymentController } from './controller'

export class PaymentRoutes {
    static get routes(): Router {
        const router = Router()
        const paymentController = new PaymentController()
        router.get('/', paymentController.getAll)
        router.post('/', paymentController.create)
        router.put('/:id', paymentController.update)
        router.delete('/:id', paymentController.delete)

        return router
    }
}