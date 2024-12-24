import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Object.module.css";
import Container from "../components/layout/container";
import ObjectDetails from "../components/layout/objectDetails";
import { AiOutlineLeft, AiOutlineSetting } from "react-icons/ai";
import ExpandableSection from "../components/layout/expandableSection";
import Comments from "../components/layout/comments";
import DropdownMenu from "../components/layout/dropdownMenu";
import Ticket from "../components/layout/ticket";
import axios from "axios";

function Object({ type }) {
  const { id } = useParams(); // Pega o ID da rota
  const [data, setData] = useState(null); // Estado para armazenar os dados
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para capturar erros

  // URL da API com base no tipo
  const endpointMap = {
    cliente: `/api/users/${id}`,
    quarto: `/api/quartos/${id}`,
    reserva: `/api/reservas/${id}`,
    dependente: `/api/dependentes/${id}`,
  };

  // Faz a requisição com base no tipo e ID
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://localhost:7117/api/users/${id}`
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  // Gera as iniciais do nome para o avatar
  const generateAvatar = (name) => {
    const ignoredWords = ["da", "de", "do", "das", "dos"];
    return name
      ?.split(" ")
      .filter((word) => !ignoredWords.includes(word.toLowerCase()))
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  // Renderiza os dados obtidos
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Nenhum dado encontrado.</div>;
  }

  return (
    <Container>
      <div className={styles.genericpage}>
        {/* Coluna da esquerda */}
        <div className={styles.leftcolumn}>
          <div className={styles.headerlinks}>
            <Link to={`/${type}`}>
              <AiOutlineLeft style={{ marginRight: "8px", fontSize: "12px" }} />{" "}
              Voltar
            </Link>
            <DropdownMenu />
          </div>
          <div className={styles.profileHeader}>
            <div>
              <div className={styles.avatar}>
                {generateAvatar(data.fullName || data["Nome"] || "")}
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{data.fullName}</h2>
              {type === "cliente" && (
                <p className={styles.email}>{data.email}</p>
              )}
            </div>
          </div>
          <ObjectDetails data={data} />
        </div>

        {/* Coluna central */}
        <div className={styles.centercolumn}>
          <div className={styles.highlights}>
            <div className={styles.header}>
              <h3 className={styles.titlecenter}>Dados e Atividades</h3>
            </div>
            <div className={styles.dataContainer}>
              <div className={styles.dataItem}>
                <span className={styles.label}>Data de Criação</span>
                <span className={styles.value}>
                  {data["Data de Criação"] || "N/A"}
                </span>
              </div>
              {type === "reserva" && (
                <>
                  <div className={styles.dataItem}>
                    <span className={styles.label}>Data de Entrada</span>
                    <span className={styles.value}>
                      {data["Data de Entrada"] || "N/A"}
                    </span>
                  </div>
                  <div className={styles.dataItem}>
                    <span className={styles.label}>Data de Saída</span>
                    <span className={styles.value}>
                      {data["Data de Saída"] || "N/A"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <Comments />
        </div>

        {/* Coluna da direita */}
        <div className={styles.rightcolumn}>
          {type === "cliente" && (
            <ExpandableSection title="Dependentes">
              {data.partners?.map((dependente) => (
                <Ticket
                  key={dependente.id}
                  data={{
                    Nome: dependente.Nome,
                    CPF: dependente.CPF,
                    "Data de Criação": dependente["Data de Criação"],
                  }}
                  type="dependentes"
                />
              ))}
            </ExpandableSection>
          )}
          {type === "reserva" && (
            <ExpandableSection title="Reservas">
              {data.reservations?.map((reservation) => (
                <Ticket
                  key={reservation.id}
                  data={{
                    'Check-in': reservation.Nome,
                    'Check-out': reservation.CPF,
                    "Data de Criação": reservation.dateCreation,
                  }}
                  type="dependentes"
                />
              ))}
            </ExpandableSection>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Object;
