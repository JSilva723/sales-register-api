import { Update } from '@context/category/aplication/use-cases/update'
import { UpdateDto } from '@context/category/domain/dtos/update-dto'
import { Category } from '@context/category/domain/entity'
import { Repository } from '@context/category/domain/repository'
import { BadRequestError } from '@shared/errors'

describe('Update', () => {
    let mockRepository: jest.Mocked<Repository>
    let updateUseCase: Update

    beforeEach(() => {
        mockRepository = {
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
        updateUseCase = new Update(mockRepository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Should update a category', async () => {
        const id = 1
        const inputData = { name: 'Updated Category', other: 'Other property', id: 'id' }
        const updatedCategory: Category = { id: 1, name: 'Updated Category', isActive: true }
        mockRepository.update.mockResolvedValue(updatedCategory)
        const result = await updateUseCase.execute(id, inputData)
        expect(result).toEqual(updatedCategory)
    })

    test('should throw BadRequestError for invalid ID', async () => {
        const id = 'invalid'
        const inputData = { name: 'Updated Category' }
        const error = 'The ID must be number'
        const badRequest = { statusCode: 400, message: error, name: 'TestErrorBadRequest' }
        UpdateDto.update = jest.fn().mockReturnValue([error, undefined])
        BadRequestError.drop = jest.fn().mockReturnValue(badRequest)
        try {
            updateUseCase.execute(+id, inputData)
        } catch (e) {
            expect(e).toEqual(badRequest)
        }
    })
})
