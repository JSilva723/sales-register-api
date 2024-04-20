import { Category } from '../domain/entity'
import { Repository as CategoryRepository } from '../domain/repository'
import { CreateDto } from '../domain/dtos/create-dto'
import { UpdateDto } from '../domain/dtos/update-dto'
import { DataSource } from '../domain/data-source'

export class Repository implements CategoryRepository {
    constructor(private readonly dataSource: DataSource) { }
    getAll(): Promise<Category[]> {
        return this.dataSource.getAll()
    }
    create(createDto: CreateDto): Promise<Category> {
        return this.dataSource.create(createDto)
    }
    update(id: number, updateDto: UpdateDto): Promise<Category> {
        return this.dataSource.update(id, updateDto)
    }
    delete(id: number): Promise<void> {
        return this.dataSource.delete(id)
    }
}