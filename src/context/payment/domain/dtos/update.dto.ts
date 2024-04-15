export class UpdatePaymentDto {
    constructor(
        public readonly id: number,
        public readonly name: string,
    ) { }

    get values() {
        const obj: { [key: string]: string } = {}
        if (this.name) obj.name = this.name

        return obj
    }

    static update(props: { id: number, name: string }): [string?, UpdatePaymentDto?] {
        const { id, name } = props
        if (!id || isNaN(Number(id))) {
            return ['The ID must be a number', undefined]
        }

        return [undefined, new UpdatePaymentDto(id, name)]
    }
}