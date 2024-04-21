import { GetAll } from '@context/category/aplication/use-cases/get-all'
import { Category } from '@context/category/domain/entity'
import { Repository } from '@context/category/domain/repository'

describe('Use Case GetAll', () => {
    let repositoryMock: jest.Mocked<Repository>
    let getAllUseCase: GetAll

    beforeEach(() => {
        repositoryMock = {
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }

        getAllUseCase = new GetAll(repositoryMock)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Should return all categories from the repository', async () => {
        const categories: Category[] = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]
        repositoryMock.getAll.mockResolvedValue(categories)
        const result = await getAllUseCase.execute()
        expect(result).toEqual(categories)
    })
})
