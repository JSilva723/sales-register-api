import { Category } from '../../domain/entity'
import { Repository } from '../../domain/repository'
import { CreateDto } from '../../domain/dtos/create-dto'
import { UpdateDto } from '../../domain/dtos/update-dto'
import { prisma } from '../../../../config/postgres-db-client'

export class DataBasePrisma implements Repository {
    async getAll(): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            select: {  name: true }
        })

        return categories.map(category => Category.fromObject(category))
    }

    async create(createDto: CreateDto): Promise<Category> {
        const category = await prisma.category.create({
            data: createDto!,
            select: { id: true, name: true }
        })

        return Category.fromObject(category)
    }

    async update(id: number, updateDto: UpdateDto): Promise<Category> {
        const category = await prisma.category.update({
            where: { id },
            data: updateDto!.values,
            select: { id: true, name: true }
        })

        return Category.fromObject(category)
    }

    async delete(id: number): Promise<void> {
        await prisma.category.update({
            where: { id, isActive: true },
            data: { isActive: false }
        })

        return
    }

}