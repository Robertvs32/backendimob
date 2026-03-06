import express from "express";
import router from "./routes.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(router);
app.use(cors({
    origin: "www.local.com",
    credentials: true
}))

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
})
