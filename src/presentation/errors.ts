export interface HttpError {
    statusCode: number
    message: string
}

export class NotFoundError extends Error {
    private readonly statusCode = 404
    constructor(message: string) {
        super(message)
    }
}

export class BadRequestError extends Error {
    private readonly statusCode = 400
    constructor(message: string) {
        super(message)
    }
}