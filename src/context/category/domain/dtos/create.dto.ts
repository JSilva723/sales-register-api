export class CreateCategoryDto {
    constructor(public readonly name: string) { }

    static create(props: { [key: string]: string }): [string?, CreateCategoryDto?] {
        const { name } = props
        if (!name) return ['Name property is required', undefined]

        return [undefined, new CreateCategoryDto(name)]
    }
}