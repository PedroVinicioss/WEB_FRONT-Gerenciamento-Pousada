import React from "react";
import styles from "../../styles/objectDetails.module.css";
import { useState } from "react";
import ExpandableSection from "./expandableSection";

function Details({ data }) {
  const [fields, setFields] = useState(data);

  

  const renderFields = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} className={styles.field}>
        <label htmlFor={key} className={styles.label}>
          {key.replace(/_/g, " ")} {}
        </label>
        <input
          type="text"
          id={key}
          name={key}
          value={value || ""}
          className={styles.input}
          onChange={(e) => {
            setFields({ ...fields, [key]: e.target.value });
          }}
        />
      </div>
    ));
  };

  const contactFields = {
    "E-mail": data["email"],
    "Telefone Fixo": data["phone"],
    Telefone: data["mobilePhone"],
    CPF: data["cpf"],
    RG: "",
    Profissão: data["profession"],
    "Data de Nascimento": data["birthDate"],
    Sexo: data["sex"]
  };

  const addressFields = {
    CEP: data["postalCode"],
    Endereço: data["address"],
    Número: data["number"],
    Cidade: data["city"],
    Bairro: data["neighborhood"],
    Estado: data["state"],
    País: data["country"],
    Complemento: data["addressComplement"]
  };

  return (
    <div>
      <ExpandableSection title="Sobre o Contato">
        {renderFields(contactFields)}
      </ExpandableSection>

      <ExpandableSection title="Dados de Endereço do Cliente" expanded={false}>
        {renderFields(addressFields)}
      </ExpandableSection>
    </div>
  );
}

export default Details;
