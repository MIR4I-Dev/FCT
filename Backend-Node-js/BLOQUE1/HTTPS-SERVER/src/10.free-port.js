const net = require('node:net');

function findFreePort(desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(desiredPort, () => {
            const { port } = server.address();
            server.close(() => {
                resolve(port);
            });
        });

        //Escuchamos el evento error si ocurre algo
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                //Si el puerto está en uso, vamos con el 0 para que nos de uno disponible
                findFreePort(0).then(port => resolve(port));
            } else {
                reject(err);
            }
        });
    });
}

module.exports = { findFreePort };