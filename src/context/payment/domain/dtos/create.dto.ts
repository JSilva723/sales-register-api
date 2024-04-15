export class CreatePaymentDto {
    constructor(public readonly name: string) { }

    static create(props: { name: string }): [string?, CreatePaymentDto?] {
        const { name } = props
        if (!name) return ['Name property is required', undefined]

        return [undefined, new CreatePaymentDto(name)]
    }
}