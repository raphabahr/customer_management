import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import '../styles/global.js';

const FormularioContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
cursor: pointer;
`;

const Label = styled.label`
  padding: 10px;
  color: #20b898;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #E07E34;
  color: white;
  height: 42px;
    &:hover {
    background-color: #20b898;
    box-shadow: -2px 4px 10px rgba(0, 0, 0, .4);
  }
`;

const Form = ({ getContatos, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/clientes")
      .then(({ data }) => setClientes(data))
      .catch((error) => toast.error(error.message));
  }, []);

  useEffect(() => {
    if (onEdit) {
      const contatos = ref.current;
      contatos.nome_completo.value = onEdit.nome_completo;
      contatos.email.value = onEdit.email;
      contatos.telefone.value = onEdit.telefone;
      contatos.id_cliente.value = onEdit.id_cliente;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_completo.value ||
      !user.email.value ||
      !user.telefone.value ||
      !user.id_cliente.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios.put("http://localhost:8800/contatos/" + onEdit.id_contato,
        {
          nome_completo: user.nome_completo.value,
          email: user.email.value,
          telefone: user.telefone.value,
          id_cliente: user.id_cliente.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios.post("http://localhost:8800/contatos", {
        nome_completo: user.nome_completo.value,
        email: user.email.value,
        telefone: user.telefone.value,
        id_cliente: user.id_cliente.value,
      })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome_completo.value = "";
    user.email.value = "";
    user.telefone.value = "";
    user.id_cliente.value = "";

    setOnEdit(null);
    getContatos();
  };

  return (
    <FormularioContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome Completo</Label>
        <Input name="nome_completo" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label>Referência Cliente</Label>
        <select id="id_cliente" name="id_cliente" defaultValue="">
          <option value="" disabled>Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nome_completo}
            </option>
          ))}
        </select>
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormularioContainer>
  );
}

export default Form;
