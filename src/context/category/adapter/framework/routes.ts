import { Router, Request, Response, NextFunction } from 'express'
import { Repository } from '../../aplication/repository'
import { DataBasePrisma } from '../data-source/data-base-prisma'
import { GetAll } from '../../aplication/use-cases/get-all'
import { Create } from '../../aplication/use-cases/create'
import { Update } from '../../aplication/use-cases/update'
import { Delete } from '../../aplication/use-cases/delete'

const dataSource = new DataBasePrisma()
const repository = new Repository(dataSource)

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router()

        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            try {
                new GetAll(repository)
                    .execute()
                    .then(categories => res.json(categories))
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        router.post('/', (req: Request, res: Response, next: NextFunction) => {
            try {
                new Create(repository)
                    .execute(req.body)
                    .then(categorie => res.json(categorie))
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
            try {
                new Update(repository)
                    .execute(+req.params.id, req.body)
                    .then(categorie => res.json(categorie))
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
            try {
                new Delete(repository)
                    .execute(+req.params.id)
                    .then(categorie => res.json(categorie))
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        return router
    }
}