import { Request, Response } from 'express'
import { prisma } from '../../config/postgres-db-client'
import { CreateCategoryDto } from './domain/dtos/create.dto'
import { UpdateCategoryDto } from './domain/dtos/update.dto'

// TODO add handle errors
export class CategoryController {
    constructor() { }

    public getAll = async (req: Request, res: Response) => {
        const all = await prisma.category.findMany({
            where: { isActive: true },
            select: { id: true, name: true }
        })

        return res.json(all)
    }

    public create = async (req: Request, res: Response) => {
        const [error, createDto] = CreateCategoryDto.create(req.body)
        if (error) return res.status(400).json({ error })
        const category = await prisma.category.create({
            data: createDto!,
            select: { id: true, name: true }
        })

        return res.status(201).json(category)
    }

    public update = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateDTO] = UpdateCategoryDto.update({ id })
        if (error) return res.status(400).json({ error })
        const category = await prisma.category.update({
            where: { id },
            data: updateDTO!.values,
            select: { id: true, name: true }
        })

        return res.json(category)
    }

    public delete = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error] = UpdateCategoryDto.update({ id })
        if (error) return res.status(400).json({ error })
        await prisma.category.update({
            where: { id, isActive: true },
            data: { isActive: false }
        })

        return res.status(204).send()
    }
}