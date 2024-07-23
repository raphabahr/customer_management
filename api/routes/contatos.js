import express from "express";
import { addContato, deleteContato, getContatos, updateContato } from "../controllers/contato.js";

const routerContatos = express.Router();

routerContatos.get("/", getContatos);

routerContatos.post("/", addContato);

routerContatos.put("/:id_contato", updateContato);

routerContatos.delete("/:id_contato", deleteContato);

export default routerContatos;