import { createApp } from "../app/app.js";
import { GadgetModel } from "../models/mysql/gadgets.js";
import { UserModel } from "../models/mysql/users.js";

const app = createApp({ gadgetModel: GadgetModel, userModel: UserModel });
