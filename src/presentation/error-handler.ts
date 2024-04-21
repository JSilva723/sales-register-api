import { NextFunction, Request, Response } from 'express'
import { PrismaError } from '@config/postgres-db-client'
import { HttpError } from '@shared/errors'

export interface HandleError extends PrismaError, HttpError { }

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: HandleError, _req: Request, res: Response, _next: NextFunction) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message })
    }
    // Prisma not found record
    if (err.code && err.code === 'P2025') {
        return res.status(404).json({ error: err.meta?.cause })
    }
    // Prisma contraint violations
    if (err.code && err.code === 'P2002') {
        const fields = err.meta?.target?.join(', ')
        return res.status(400).json({ error: `The ${fields} must be unique` })
    }
    return res.status(500).json({ error: err })
}