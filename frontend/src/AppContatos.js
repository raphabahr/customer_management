import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Formulario from "./components/FormContatos.js";
import Grid from "./components/GridContatos.js";
import GlobalStyle from "./styles/global.js";

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


function AppContatos() {
  const [contatos, setContatos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getContatos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/contatos");
      setContatos(res.data.sort((a, b) => (a.nome_completo > b.nome_completo ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getContatos();
  }, [setContatos]);

  return (
    <>
      <Container>
        <StyledLink to="/">Home</StyledLink>
        <Title>Adicionar/Editar Contatos</Title>
        <Formulario onEdit={onEdit} setOnEdit={setOnEdit} getContatos={getContatos} />
        <Title>Contatos</Title>
        <Grid setOnEdit={setOnEdit} contatos={contatos} getContatos={getContatos} />
        <StyledLink to="/clientes">Clientes</StyledLink>
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </>
  );
}

export default AppContatos;
