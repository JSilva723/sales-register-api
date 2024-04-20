export class UpdateDto {
    constructor(
        public readonly name?: string,
    ) { }

    get values() {
        const obj: { [key: string]: string } = {}
        if (this.name) obj.name = this.name

        return obj
    }

    static update(data: { name?: string }): [string?, UpdateDto?] {
        const { name } = data

        return [undefined, new UpdateDto(name)]
    }
}