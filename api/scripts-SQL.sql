CREATE TABLE clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20) NOT NULL,
  data_registro DATE NOT NULL
);

CREATE TABLE contatos (
  id_contato INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  id_cliente INT NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

ALTER TABLE clientes ALTER COLUMN data_registro SET default (current_date);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';