import { db } from "../db.js";

export const getContatos = (_, res) => {
    const query = `
        SELECT contatos.*, clientes.nome_completo AS cliente_nome
        FROM contatos
        JOIN clientes ON contatos.id_cliente = clientes.id_cliente
    `;
    console.log("Buscando dados de contatos...")
    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

export const addContato = (req, res) => {
    const q =
        "INSERT INTO contatos (`nome_completo`, `email`, `telefone`, `id_cliente`) VALUES (?)";

    const values = [
        req.body.nome_completo,
        req.body.email,
        req.body.telefone,
        req.body.id_cliente,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Contato criado com sucesso.");
    });
};

export const updateContato = (req, res) => {
    const q =
        "UPDATE contatos SET `nome_completo` = ?, `email` = ?, `telefone` = ? WHERE `id_contato` = ?";

    const values = [
        req.body.nome_completo,
        req.body.email,
        req.body.telefone,
    ];

    db.query(q, [...values, req.params.id_contato], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Contato atualizado com sucesso.");
    });
};

export const deleteContato = (req, res) => {
    const q = "DELETE FROM contatos WHERE `id_contato` = ?";
    console.log("Deletando contato com ID:", req.params.id_contato); // Adicione este log

    db.query(q, [req.params.id_contato], (err) => {
        if (err) {
            console.error("Erro ao deletar contato:", err); // Adicione este log
            return res.json(err);
        }
        return res.status(200).json("Contato deletado com sucesso.");
    });
};