import { PrismaClient } from '@prisma/client'

describe('Data base with prisma', () => {
    let prisma: PrismaClient

    beforeAll(() => {
        prisma = new PrismaClient()
    })

    beforeEach(async () => {
        await prisma.category.deleteMany({})
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })


    test('Get all actives - empty', async () => {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            select: { id: true, name: true }
        })
        expect(categories).toHaveLength(0)
    })

    test('Crate one and get all', async () => {
        await prisma.category.create({
            data: { name: 'category 1' },
            select: { id: true, name: true }
        })
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            select: { id: true, name: true }
        })
        expect(categories).toHaveLength(1)
        expect(categories[0]).toStrictEqual({ id: 1, name: 'category 1' })
    })

    test('Crate one, update this and get all', async () => {
        const category = await prisma.category.create({
            data: { name: 'category 1' },
            select: { id: true, name: true }
        })
        await prisma.category.update({
            where: { id: category.id },
            data: { name: 'Category updated' },
            select: { id: true, name: true }
        })
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            select: { id: true, name: true }
        })
        expect(categories).toHaveLength(1)
        expect(categories[0]).toStrictEqual({ id: 2, name: 'Category updated' })
    })


})
