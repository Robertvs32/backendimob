import express from "express";
import router from "./routes.js";
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config({ path: '../.env' });

const app = express();
app.use(express.json());
app.use(router);

app.use(cors({
    origin: '*',
    credentials: true
}))

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
});
