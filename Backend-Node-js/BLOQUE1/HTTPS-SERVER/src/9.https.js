const http = require('node:http')
const { findFreePort } = require('./10.free-port')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    console.log('Request received - 😁')
    res.end('Hello World')
})

findFreePort(desiredPort)
    .then((port) => {
        server.listen(port, () => {
            console.log(`Server running on port http://localhost:${port} - 😎`)
        })
    })
    .catch((err) => {
        console.error('❌ Error fatal al intentar levantar el servidor:', err)
    })
