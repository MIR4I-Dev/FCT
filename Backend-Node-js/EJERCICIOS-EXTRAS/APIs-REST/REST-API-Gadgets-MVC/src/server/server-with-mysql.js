import { createApp } from "../app/app.js";
import { GadgetModel } from "../models/mysql/gadgets.js";

const app = createApp({ gadgetModel: GadgetModel });
