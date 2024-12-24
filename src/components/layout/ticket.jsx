import React from "react";
import styles from "../../styles/ticket.module.css";
import { Link } from "react-router-dom";

const Ticket = ({ data, type }) => {
  let name = type === "reservas" ? "Reserva" :  type === "dependentes" ? "Dependente" : "Cliente";
  let id = data["ID"] || data["id"];
  name = name + " - " + id;
  // Renderiza dinamicamente os campos com base nos dados fornecidos
  const renderFields = () => {
    return Object.entries(data).map(([key, value]) =>
      key !== "ID" && key !== "id" ? (
        <p key={key}>
          <span className={styles.label}>{key.replace(/_/g, " ")}:</span>{" "}
          <span className={styles.value}>{value || "N/A"}</span>
        </p>
      ) : null
    );
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHeader}>
        <Link to={`/${type}/${id}`}>
          <span>{name}</span>
        </Link>
      </div>
      <div className={styles.ticketBody}>{renderFields()}</div>
    </div>
  );
};

export default Ticket;
