import React, { useState } from "react";
import styles from "../../styles/objectDetails.module.css";
import ExpandableSection from "./expandableSection";

function Details({ data, type }) {
  const [fields, setFields] = useState(data);

  // Mapeamento de chaves do backend para rótulos amigáveis
  const labelMapping = {
    email: "E-mail",
    phone: "Telefone Fixo",
    mobilePhone: "Celular",
    cpf: "CPF",
    rg: "RG",
    profession: "Profissão",
    birthDate: "Data de Nascimento",
    sex: "Sexo Biológico",
    postalCode: "CEP",
    address: "Rua",
    number: "Número",
    city: "Cidade",
    neighborhood: "Bairro",
    state: "Estado",
    country: "País",
    addressComplement: "Complemento",
  };

  // Atualiza o estado ao editar um campo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  // Define o tipo de input para cada campo
  const getInputType = (key) => {
    const typeMapping = {
      email: "email",
      phone: "tel",
      mobilePhone: "tel",
      cpf: "text",
      rg: "text",
      profession: "text",
      postalCode: "text",
      address: "text",
      number: "number",
      city: "text",
      neighborhood: "text",
      state: "text",
      country: "text",
      addressComplement: "text",
      birthDate: "date",
      sex: "select", // Para sex, pode ser renderizado um dropdown
    };
    return typeMapping[key] || "text";
  };

  // Renderiza os campos dinamicamente
  const renderFields = (fields) => {
    return Object.entries(fields).map(([key, value]) => (
      <div key={key} className={styles.field}>
        <label htmlFor={key} className={styles.label}>
          {labelMapping[key] || key} {/* Usa o rótulo amigável, ou a chave como fallback */}
        </label>
        <input
          type={getInputType(key)} // Define o tipo do input
          id={key}
          name={key} // Usa o nome como referência ao estado
          value={
            key === "birthDate" && value
              ? new Date(value).toISOString().split("T")[0] // Formata a data para o input
              : value || ""
          }
          className={styles.input}
          onChange={handleInputChange}
        />
      </div>
    ));
  };

  // Separação dos campos em categorias
  const contactFields = {
    email: fields.email,
    phone: fields.phone,
    mobilePhone: fields.mobilePhone,
    cpf: fields.cpf,
    rg: fields.rg,
    profession: fields.profession,
    birthDate: fields.birthDate,
    sex: fields.sex,
  };

  const addressFields = {
    postalCode: fields.postalCode,
    address: fields.address,
    number: fields.number,
    city: fields.city,
    neighborhood: fields.neighborhood,
    state: fields.state,
    country: fields.country,
    addressComplement: fields.addressComplement,
  };

  return (
    <>
      {type === "cliente" ? (
        <div>
          <ExpandableSection title="Sobre o Contato">
            {renderFields(contactFields)}
          </ExpandableSection>
          <ExpandableSection title="Dados de Endereço do Cliente" expanded={false}>
            {renderFields(addressFields)}
          </ExpandableSection>
        </div>
      ) : (
        <div>
          <ExpandableSection title="Sobre a Reserva">
            {renderFields(fields)}
          </ExpandableSection>
        </div>
      )}
    </>
  );
}

export default Details;
