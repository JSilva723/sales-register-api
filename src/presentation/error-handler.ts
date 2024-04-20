import { NextFunction, Request, Response } from 'express'
import { HttpError } from './errors'

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    if (err.statusCode) {
        return res.status(err.statusCode).send({ error: err.message })
    }
    console.log('error', err) // eslint-disable-line no-console
    res.status(500).json({ error: err })
}