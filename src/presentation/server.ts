import express, { Router } from 'express'
import cors from 'cors'

interface Options {
    port: number
    routes: Router
}

export class Server {
    private app = express()
    private readonly port: number
    private readonly routes: Router

    constructor(opt: Options) {
        const { port, routes } = opt
        this.port = port
        this.routes = routes
    }

    public start() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(this.routes)
        this.app.listen(this.port, () => {
            // eslint-disable-next-line no-console
            console.log('Server listen on port: ', this.port)
        })
    }
}