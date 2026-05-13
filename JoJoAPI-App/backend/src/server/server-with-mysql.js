import { createApp } from "../app/app.js";
import { StandModel } from "../models/mysql/stands.js";
import { UserModel } from "../models/mysql/users.js";
import { findAvailablePort } from "../logic/free-port.js";
import { PORT } from "../config/config.js";

const app = createApp({ standModel: StandModel, userModel: UserModel });

const getPort = async () => {
    return await findAvailablePort(PORT);
}

const startServer = async () => {
    const port = await getPort();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();
