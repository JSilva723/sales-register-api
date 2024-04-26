import { Create } from '@context/category/aplication/use-cases/create'
import { CreateDto } from '@context/category/domain/dtos/create-dto'
import { Category } from '@context/category/domain/entity'
import { Repository } from '@context/category/domain/repository'
import { BadRequestError } from '@shared/errors'

describe('Use Case Create', () => {
    let mockRepository: jest.Mocked<Repository>
    let createUseCase: Create

    beforeEach(() => {
        mockRepository = {
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
        createUseCase = new Create(mockRepository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Should create a new category', async () => {
        const inputData = { name: 'Test Category' }
        const createdCategory: Category = { id: 1, name: 'Test Category' }
        mockRepository.create.mockResolvedValue(createdCategory)
        const result = await createUseCase.execute(inputData)
        expect(result).toEqual(createdCategory)
    })

    test('Should create a new category', () => {
        const inputData = { invalid: 'Invalid property' }
        const error = 'Invalid data'
        const badRequest = { statusCode: 400, message: error, name: 'TestErrorBadRequest' }
        CreateDto.create = jest.fn().mockReturnValue([error, undefined])
        BadRequestError.drop = jest.fn().mockReturnValue(badRequest)
        try {
            createUseCase.execute(inputData)
        } catch (e) {
            expect(e).toEqual(badRequest)
        }
    })

})
