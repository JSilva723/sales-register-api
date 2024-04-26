import { BadRequestError, NotFoundError } from '@shared/errors'

describe('Custom http error', () => {
    test('Error 400 Bad request', () => {
        const message = 'Bad Request Error Message'
        const error = BadRequestError.drop(message)
        expect(error).toBeInstanceOf(BadRequestError)
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe(message)
    })

    test('Error 404 Not Found', () => {
        const message = 'Not Found Error Message'
        const error = NotFoundError.drop(message)
        expect(error).toBeInstanceOf(NotFoundError)
        expect(error.statusCode).toBe(404)
        expect(error.message).toBe(message)
    })
})