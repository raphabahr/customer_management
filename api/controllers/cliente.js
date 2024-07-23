import { db } from "../db.js";

export const getClientes = (_, res) => {
    const query = `
        SELECT c.id_cliente, c.nome_completo, c.email, c.telefone, c.data_registro,
               GROUP_CONCAT(ct.nome_completo SEPARATOR ', ') AS contatos
        FROM clientes c
        LEFT JOIN contatos ct ON c.id_cliente = ct.id_cliente
        GROUP BY c.id_cliente;
    `;

    console.log("Buscando dados de clientes...")
    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addCliente = (req, res) => {
    const q =
        "INSERT INTO clientes (`nome_completo`, `email`,`telefone`) VALUES(?)";

    const values = [
        req.body.nome_completo,
        req.body.email,
        req.body.telefone,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Cliente criado com sucesso.");
    });
};

export const updateCliente = (req, res) => {
    const q =
        "UPDATE clientes SET `nome_completo` = ?, `email` = ?, `telefone` = ? WHERE `id_cliente` = ?";

    const values = [
        req.body.nome_completo,
        req.body.email,
        req.body.telefone,
    ];

    db.query(q, [...values, req.params.id_cliente], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Cliente atualizado com sucesso.");
    });
};

export const deleteCliente = (req, res) => {
    const q = "DELETE FROM clientes WHERE `id_cliente` = ?";

    db.query(q, [req.params.id_cliente], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Cliente deletado com sucesso.");
    });
};