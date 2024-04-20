export class CreateDto {
    constructor(public readonly name: string) { }

    static create(props: { [key: string]: string }): [string?, CreateDto?] {
        const { name } = props
        if (!name) return ['Name property is required', undefined]

        return [undefined, new CreateDto(name)]
    }
}