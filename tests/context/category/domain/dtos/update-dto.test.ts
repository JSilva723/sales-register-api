import { UpdateDto } from '@context/category/domain/dtos/update-dto'

describe('UpdateDto', () => {
    test('Should create a new UpdateDto instance with the provided name', () => {
        const data = { id: 'test-id', name: 'Test Name', other: false }
        const [error, dto] = UpdateDto.update(data)
        expect(error).toBeUndefined()
        expect(dto).toBeInstanceOf(UpdateDto)
        expect('id' in dto!.values).toBe(false)
        expect('other' in dto!.values).toBe(false)
        expect(dto!.values).toMatchObject({ name: 'Test Name' })
    })
})
