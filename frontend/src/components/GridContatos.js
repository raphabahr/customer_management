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
  margin: 20px auto;
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

const Grid = ({ contatos, setContatos, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id_contato) => {
        try {
            const response = await axios.delete(`http://localhost:8800/contatos/${id_contato}`);
            console.log('Response:', response);
            if (response.status === 200) {
                toast.success('Contato deletado com sucesso.');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                throw new Error('Erro inesperado ao deletar contato');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao deletar contato';
            toast.error(errorMessage);
        } finally {
            setOnEdit(null);
        }
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome Completo</Th>
                    <Th>Email</Th>
                    <Th>Telefone</Th>
                    <Th>Cliente Associado</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {contatos.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.nome_completo}</Td>
                        <Td width="25%">{item.email}</Td>
                        <Td width="15%">{formatPhoneNumber(item.telefone)}</Td>
                        <Td width="30%">{item.cliente_nome}</Td>
                        <Td>
                            <StyledFaEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(item)} />
                        </Td>
                        <Td>
                            <StyledFaTrash style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id_contato)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;