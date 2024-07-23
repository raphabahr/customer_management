import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

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

const Form = ({ getClientes, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const clientes = ref.current;
      clientes.nome_completo.value = onEdit.nome_completo;
      clientes.email.value = onEdit.email;
      clientes.telefone.value = onEdit.telefone;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_completo.value ||
      !user.email.value ||
      !user.telefone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios.put("http://localhost:8800/clientes/" + onEdit.id_cliente, {
        nome_completo: user.nome_completo.value,
        email: user.email.value,
        telefone: user.telefone.value,
      })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios.post("http://localhost:8800/clientes", {
        nome_completo: user.nome_completo.value,
        email: user.email.value,
        telefone: user.telefone.value,
      })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome_completo.value = "";
    user.email.value = "";
    user.telefone.value = "";

    setOnEdit(null);
    getClientes();
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
        <Label>Telefone (DD) + Número</Label>
        <Input name="telefone" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormularioContainer>
  );
}

export default Form;