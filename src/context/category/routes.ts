import { Router } from 'express'
import { CategoryController } from './controller'

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router()
        const categoryController = new CategoryController()
        router.get('/', categoryController.getAll)
        router.post('/', categoryController.create)
        router.put('/:id', categoryController.update)
        router.delete('/:id', categoryController.delete)

        return router
    }
}
