import { UpdateDto } from '../../domain/dtos/update-dto'
import { Category } from '../../domain/entity'
import { Repository } from '../../domain/repository'

export class Update {
    constructor(private readonly repository: Repository) { }

    execute(id: number, data: { [key: string]: string }): Promise<Category> {
        if (!id || isNaN(Number(id))) throw 'The ID must be number'
        const [error, updateDto] = UpdateDto.update(data)
        if(error) throw error

        return this.repository.update(id, updateDto!)
    }
}