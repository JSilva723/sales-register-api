import { Category } from '../../domain/entity'
import { Repository } from '../../domain/repository'

export class GetAll {
    constructor(private readonly repository: Repository) { }

    execute(): Promise<Category[]>{
        return this.repository.getAll()
    }
}