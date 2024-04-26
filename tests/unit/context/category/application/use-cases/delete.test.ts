import { Delete } from '@context/category/aplication/use-cases/delete'
import { UpdateDto } from '@context/category/domain/dtos/update-dto'
import { Repository } from '@context/category/domain/repository'
import { BadRequestError } from '@shared/errors'

describe('Use Case Delete', () => {
    let mockRepository: jest.Mocked<Repository>
    let deleteUseCase: Delete

    beforeEach(() => {
        mockRepository = {
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
        deleteUseCase = new Delete(mockRepository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Should delete a category', async () => {
        const id = 1
        mockRepository.delete.mockResolvedValue(undefined)
        const result = await deleteUseCase.execute(id)
        expect(result).toEqual(undefined)
    })

    test('Should throw BadRequestError for invalid ID', async () => {
        const id = 'invalid'
        const error = 'The ID must be number'
        const badRequest = { statusCode: 400, message: error, name: 'TestErrorBadRequest' }
        UpdateDto.update = jest.fn().mockReturnValue([error, undefined])
        BadRequestError.drop = jest.fn().mockReturnValue(badRequest)
        try {
            deleteUseCase.execute(+id)
        } catch (e) {
            expect(e).toEqual(badRequest)
        }
    })
})
