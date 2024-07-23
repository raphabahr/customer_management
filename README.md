
# Cadastro de Clientes e Contatos

Este repositório contém um projeto de gestão de Clientes, composto por uma API criada em Node.js e um frontend desenvolvido em React.

## Tecnologias Utilizadas e Estrutura do Projeto

- **Backend**:
  - Node JS
  - Axios
  - Mysql
    
- **Frontend**:
  - HTML
  - CSS
  - React

- **Gerenciador de pacote**:
  - Yarn / npm
    
- **Estrutura**:    
  - api/: Diretório contendo o código-fonte da API.
  - frontend/: Diretório contendo o código-fonte do frontend.
    
 
## Métodos 

* DB first
  

## Aplicabilidade

- **Conexão com o Banco de Dados**: Utiliza o banco de dados Mysql.

- **API de Clientes/Contatos**: Rotas completas para criar, ler, atualizar e excluir clientes e contatos.

### API Clientes:

- **Listar Todos os Clientes:**
  - Método: GET
  - Rota: api/routes/clientes
  - Função: Retorna lista de todos os clientes.

- **Editar Cliente:**
  - Método: PUT
  - Rota: api/routes/clientes/id_cliente
  - Função: Edita campos do cliente de ID especificado.

- **Criar Cliente:**
  - Método: POST
  - Rota: api/routes/clientes
  - Função: Cria um novo cliente quando todos os campos estão preenchidos.

- **Deletar Cliente:**
  - Método: DELETE
  - Rota: api/routes/clientes/id_cliente
  - Função: Exclui o cliente com o ID especificado.

### API Contatos:
- **Listar Todos os Contatos:**
  - Método: GET
  - Rota: api/contacts
  - Função: Retorna lista de todos os contatos.

- **Editar Contato:**
  - Método: PUT
  - Rota: api/routes/contatos/id_contato
  - Função: Edita campos do cliente de ID especificado.

- **Criar Contato:**
  - Método: POST
  - Rota: api/contatos
  - Função: Cria um novo contato quando todos os campos estão preenchidos.

- **Deletar Contato:**
  - Método: DELETE
  - Rota: aapi/routes/contatos/id_contato
  - Função: Exclui o contato com o ID especificado
    
    
## Como Executar Localmente

**Clone este repositório.**


```
git clone https://github.com/raphabahr/customer_management
```

**Configuração da API**

Execute no banco de dados o arquivo scripts-SQL.sql


Navegue até o diretório da API: 
```
cd api
```

Instale as dependências:
```
npm install
```

Inicie a API:
```
yarn start
```

 - Rode a API em: https://localhost:8800/
   

**Configuração do Frontend**


Navegue até o diretório do frontend:
```
cd frontend
```

Instale as dependências:
```
npm install
```

Inicie o servidor de desenvolvimento:
```
yarn start
```

 - Rode o Front em: https://localhost:3000/
   

## Dependências


**API**
- cors
- express
- moment
- mysql
- nodemon

**Frontend**
- react-oauth/google
- axios
- react
- react-dom
- react-icons
- react-router-dom
- react-toastify
- recharts
- styled-components

# Autor
Raphael Bahr

https://br.linkedin.com/in/raphael-bahr
