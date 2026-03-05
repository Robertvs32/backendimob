import e from "express";
import router from "./routes";

const app = express();
app.use(e.json());
app.use(router);
