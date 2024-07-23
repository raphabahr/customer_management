import express from "express";
import { addCliente, deleteCliente, getClientes, updateCliente } from "../controllers/cliente.js";

const routerClientes = express.Router();

routerClientes.get("/", getClientes);

routerClientes.post("/", addCliente);

routerClientes.put("/:id_cliente", updateCliente);

routerClientes.delete("/:id_cliente", deleteCliente);

export default routerClientes;