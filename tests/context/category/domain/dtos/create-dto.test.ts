import { CreateDto } from '@context/category/domain/dtos/create-dto'

describe('CreateDto', () => {
    test('Should return an error if name is not provided', () => {
        const props = {}
        const [error, dto] = CreateDto.create(props)
        expect(error).toBe('Name property is required')
        expect(dto).toBeUndefined()
    })

    test('Should create a new CreateDto instance with the provided name', () => {
        const props = { name: 'Test Name' }
        const [error, dto] = CreateDto.create(props)
        expect(error).toBeUndefined()
        expect(dto).toBeInstanceOf(CreateDto)
        expect(dto!.name).toBe('Test Name')
    })
})
