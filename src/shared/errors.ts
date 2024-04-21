export interface HttpError {
    statusCode: number
    message: string
}

abstract class CustomError extends Error implements HttpError {
    abstract statusCode: number;

    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class NotFoundError extends CustomError {
    statusCode = 404
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }

    public static drop(message: string) {
        return new NotFoundError(message)
    }
}

export class BadRequestError extends CustomError {
    statusCode = 400
    constructor(message: string) {
        super(message)
        this.name = 'BadRequestError'
    }

    public static drop(message: string) {
        return new BadRequestError(message)
    }
}