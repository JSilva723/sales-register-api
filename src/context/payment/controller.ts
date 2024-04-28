import { Request, Response } from 'express'
import { prisma } from '../../config/postgres-db-client'
import { CreatePaymentDto } from './domain/dtos/create.dto'
import { UpdatePaymentDto } from './domain/dtos/update.dto'

export class PaymentController {
    constructor() { }

    public getAll = async (req: Request, res: Response) => {
        const all = await prisma.payment.findMany({
            where: { isActive: true },
            select: { id: true, name: true }
        })

        return res.json(all)
    }

    public create = async (req: Request, res: Response) => {
        const [error, createDto] = CreatePaymentDto.create(req.body)
        if (error) return res.status(400).json({ error })
        const payment = await prisma.payment.create({
            data: createDto!,
            select: { id: true, name: true }
        })

        return res.status(201).json(payment)
    }

    public update = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateDTO] = UpdatePaymentDto.update({ id, ...req.body })
        if (error) return res.status(400).json({ error })
        const payment = await prisma.payment.update({
            where: { id },
            data: updateDTO!.values,
            select: { id: true, name: true }
        })

        return res.json(payment)
    }

    public delete = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error] = UpdatePaymentDto.update({ id })
        if (error) return res.status(400).json({ error })
        await prisma.payment.update({
            where: { id, isActive: true },
            data: { isActive: false }
        })

        return res.status(204).send()
    }
}
