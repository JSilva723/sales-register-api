interface ObjValues {
    id?: number
    name?: string
}

export class Category {
    constructor(
        public id?: number,
        public name?: string,
        public isActive?: boolean
    ) { }

    public static fromObject(obj: ObjValues): Category {
        const { id, name } = obj
        if (!id) throw 'Id is required'
        if (!name) throw 'Name is required'

        return new Category(id, name)
    }
}