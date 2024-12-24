import styles from "../styles/clientes.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Clientes() {
  const [search, setSearch] = useState("");
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "1234-5678",
      cpf: "123.456.789-00",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      email: "maria@email.com",
      telefone: "9876-5432",
      cpf: "987.654.321-00",
    },
    {
      id: 3,
      nome: "Carlos Santos",
      email: "carlos@hotmail.com",
      telefone: "8765-4321",
      cpf: "876.543.210-00",
    },
  ]);

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch = (cliente.nome
      .toLowerCase()
      .includes(search.toLowerCase())) || (cliente.email).toLowerCase().includes(search.toLowerCase()) || (cliente.cpf).toLowerCase().includes(search.toLowerCase()) || (cliente.telefone).toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className={styles.container}>
      {/* Barra de Pesquisa */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Pesquisar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.inputBar}
        />
      </div>

      {/* Tabela de Clientes */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className={styles.columnName}>
                <Link to={`/clientes/${cliente.id}`}>{cliente.nome}</Link>
              </td>
              <td>{cliente.email}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;
