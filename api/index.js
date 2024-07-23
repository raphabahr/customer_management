import cors from "cors";
import express from "express";
import clientesRoutes from "./routes/clientes.js";
import contatosRoutes from "./routes/contatos.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/clientes", clientesRoutes);
app.use("/contatos", contatosRoutes);

app.listen(8800, () => {
    console.log('Server is running on http://localhost:8800');
});
