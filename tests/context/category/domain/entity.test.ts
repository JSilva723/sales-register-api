import { Category } from '@context/category/domain/entity'

describe('Category entity', () => {
    it('Should create a new Category instance with the provided id and name', () => {
        const obj = { id: 1, name: 'Test Category' }
        const category = Category.fromObject(obj)
        expect(category).toBeInstanceOf(Category)
        expect(category.id).toBe(1)
        expect(category.name).toBe('Test Category')
    })

    it('Should throw an error if id is not provided', () => {
        const obj = { name: 'Test Category' }
        expect(() => {
            Category.fromObject(obj)
        }).toThrow('Id is required')
    })

    it('Should throw an error if name is not provided', () => {
        const obj = { id: 1 }
        expect(() => {
            Category.fromObject(obj)
        }).toThrow('Name is required')
    })
})
