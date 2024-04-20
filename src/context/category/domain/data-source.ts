import { Category } from './entity'
import { CreateDto } from './dtos/create-dto'
import { UpdateDto } from './dtos/update-dto'

export abstract class DataSource {
    abstract getAll(): Promise<Category[]>
    abstract create(createDto: CreateDto): Promise<Category>
    abstract update(id: number, updateDto: UpdateDto): Promise<Category>
    abstract delete(id: number): Promise<void>
}