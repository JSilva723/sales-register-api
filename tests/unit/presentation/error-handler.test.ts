import { HandleError, errorHandler } from '@presentation/error-handler'
import { Request, Response, NextFunction } from 'express'

describe('Middleware erroHandler', () => {
    let mockResponse: Partial<Response>
    let mockRequest: Partial<Request>
    const mockNextFunction: NextFunction = jest.fn()

    beforeEach(() => {
        mockRequest = {}
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })

    test('Should be must status code 500 for unhandled errors ', async () => {
        const error = 'ERROR MESSAGE'
        try {
            throw error
            expect(true).toBe(false)
        } catch (e) {
            errorHandler(e as HandleError, mockRequest as Request, mockResponse as Response, mockNextFunction)
            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(mockResponse.json).toHaveBeenCalledWith({ error })
            expect(mockNextFunction).not.toHaveBeenCalled()
        }
    })

    test('Should handle httpErrors', () => {
        const err = { statusCode: 404, message: 'Not found' }
        errorHandler(err as HandleError, mockRequest as Request, mockResponse as Response, mockNextFunction)
        expect(mockResponse.status).toHaveBeenCalledWith(404)
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Not found' })
    })

    it('Should handle Prisma not found record error', () => {
        const err = { code: 'P2025', meta: { cause: 'Record not found' } }
        errorHandler(err as HandleError, mockRequest as Request, mockResponse as Response, mockNextFunction)
        expect(mockResponse.status).toHaveBeenCalledWith(404)
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Record not found' })
    })

    it('Should handle Prisma constraint violations error', () => {
        const err = { code: 'P2002', meta: { target: ['username', 'name', 'age'] } }
        errorHandler(err as HandleError, mockRequest as Request, mockResponse as Response, mockNextFunction)
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'The username, name, age must be unique' })
    })
})