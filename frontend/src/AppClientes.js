import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Formulario from "./components/FormClientes.js";
import Grid from "./components/GridClientes.js";
import GlobalStyle from "./styles/global";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #F6FAFF;
`;

const Title = styled.h2`
  padding: 10px;
  color: #20b898;
`;

const StyledLink = styled(Link)`
  background-color: #20b898;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  margin: 10px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.4);
  }
`;

function AppClientes() {
  const [clientes, setClientes] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:8800/clientes");
      setClientes(res.data.sort((a, b) => (a.nome_completo > b.nome_completo ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, [setClientes]);

  return (
    <>
      <Container>
        <StyledLink to="/">Home</StyledLink>
        <Title>Adicionar/Editar Clientes</Title>
        <Formulario onEdit={onEdit} setOnEdit={setOnEdit} getClientes={getClientes} />
        <Title>Clientes</Title>
        <Grid setOnEdit={setOnEdit} clientes={clientes} setClientes={setClientes} />
        <StyledLink to="/contatos">Contatos</StyledLink>
      </Container>
      <ToastContainer autoClose={3000}/>
      <GlobalStyle />
    </>
  );
}

export default AppClientes;
