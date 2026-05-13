import net from "net";

export function findAvailablePort(desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(desiredPort, () => {
            const port = server.address().port;
            server.close(() => {
                resolve(port);
            });
        });

        server.on("error", (err) => {
            err.code === "EADDRINUSE"
                ? findAvailablePort(0).then((port) => resolve(port))
                : reject(err);
        });
    });
}
