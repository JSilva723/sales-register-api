import 'dotenv/config'
import { server } from './server'

const PORT = process.env.PORT || 3008

server().listen(PORT, () => {
    //eslint-disable-next-line no-console
    console.log('Listen on port: ' + PORT)
})