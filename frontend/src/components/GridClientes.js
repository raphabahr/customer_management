import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1320px;
  margin: auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
  color: #20b898;
`;

export const Td = styled.td`
  padding: 10px;
  text-align: start;
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const StyledFaEdit = styled(FaEdit)`
  cursor: pointer;
  color: #20b898;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #E07E34;
  }
`;

const StyledFaTrash = styled(FaTrash)`
  cursor: pointer;
  color: #20b898;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #c8233b;
  }
`;

const formatPhoneNumber = (phoneNumber) => {

    const cleaned = phoneNumber.replace(/\D/g, '');

    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
};

const Grid = ({ clientes, setClientes, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id_cliente) => {
        await axios.delete(`http://localhost:8800/clientes/${id_cliente}`)
            .then(({ data }) => {
                console.log('Data:', data);
                const newArray = clientes.filter((cliente) => cliente.id_cliente !== id_cliente);
                setClientes(newArray);
                toast.success(data.message || 'Cliente Deletado com sucesso');
            }).catch(({ data }) => toast.error(data.message || 'Erro inesperado ao deletar o cliente'));
        setOnEdit(null);
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome Completo</Th>
                    <Th>Email</Th>
                    <Th>Telefone</Th>
                    <Th>Data de Registro</Th>
                    <Th>Contatos Associados</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {clientes.map((item, i) => (
                    <Tr key={i}>
                        <Td width="28%">{item.nome_completo}</Td>
                        <Td width="16%">{item.email}</Td>
                        <Td width="16%">{formatPhoneNumber(item.telefone)}</Td>
                        <Td width="12%">{formatDate(item.data_registro)}</Td>
                        <Td width="26%">
                            {item.contatos
                                ? item.contatos.split(', ').map((contato, index) => (
                                    <div key={index}>
                                        {index + 1}. {contato}
                                    </div>
                                ))
                                : 'Nenhum contato Associado'}
                        </Td>
                        <Td>
                            <StyledFaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td>
                            <StyledFaTrash onClick={() => handleDelete(item.id_cliente)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
