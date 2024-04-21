import { BadRequestError } from '@shared/errors'
import { CreateDto } from '../../domain/dtos/create-dto'
import { Category } from '../../domain/entity'
import { Repository } from '../../domain/repository'

export class Create {
    constructor(private readonly repository: Repository) { }

    execute(data: { [key: string]: string }): Promise<Category> {
        const [error, createDto] = CreateDto.create(data)
        if (error) throw BadRequestError.drop(error)
        return this.repository.create(createDto!)
    }
}

