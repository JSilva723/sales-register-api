import { Repository } from '../../domain/repository'

export class Delete {
    constructor(private readonly repository: Repository) { }

    execute(id: number): Promise<void> {
        if (!id || isNaN(Number(id))) {
            throw 'The ID must be number'
        }
        
        return this.repository.delete(id)
    }
}