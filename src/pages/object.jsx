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
    quarto: `/api/rooms/${id}`,
    reserva: `/api/reservations/${id}`,
    dependente: `/api/partners/${id}`,
  };

  // Faz a requisição com base no tipo e ID
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        var endpoint = endpointMap[type];
        const response = await axios.get(
          `https://localhost:7117${endpoint}`
        );
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

  const generateAvatar = (name) => {
    if (!name) return "-";
    const ignoredWords = ["da", "de", "do", "das", "dos", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "_"];
    return name
      .split(" ")
      .filter((word) => !ignoredWords.includes(word.toLowerCase()))
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const getProfileDetails = () => {
    if (!data) return { title: "-", subtitle: "-" };

    if (type === "cliente" || type === "dependente") {
      return { title: data.fullName, subtitle: data.email };
    }
    if (type === "reserva") {
      return { title: `Reserva - ${data.id}`, subtitle: data.customerName };
    }
    return { title: "-", subtitle: "-" };
  };

  const { title, subtitle } = getProfileDetails(data);


  const LoadingOrError = ({ loading, error }) => {
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;
    return null;
  };

  const RenderExpandableSection = ({ title, data, renderItem, emptyMessage }) => (
    <ExpandableSection title={title}>
      {data?.length > 0 ? data.map(renderItem) : <p>{emptyMessage}</p>}
    </ExpandableSection>
  );

  let voltar = type === "cliente" ? "Clientes" : type === "reserva" ? "Reservas" : "Dependentes";

  return (
    <Container>
      <LoadingOrError loading={loading} error={error} />
      {!loading && !error && data && (
        <div className={styles.genericpage}>
          <div className={styles.leftcolumn}>
            <div className={styles.headerlinks}>
              <Link to={`/${type}s`}>
                <AiOutlineLeft style={{ marginRight: "8px", fontSize: "12px" }} />{" "}
                {voltar}
              </Link>
              <DropdownMenu />
            </div>
            <div className={styles.profileHeader}>
              <div>
                <div className={styles.avatar}>{generateAvatar(title)}</div>

              </div>
              <div className={styles.profileInfo}>

                <h2 className={styles.profileName}>{title}</h2>
                <p className={styles.email}>{subtitle}</p>
              </div>
            </div>
            <ObjectDetails data={data} type={type} />
          </div>



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

          <div className={styles.rightcolumn}>
            {type === "cliente" ? (
              <>
                <RenderExpandableSection
                  title="Dependentes"
                  data={data.partners}
                  renderItem={(dependente) => (
                    <Ticket
                      key={dependente.id}
                      data={{
                        Nome: dependente.Nome,
                        CPF: dependente.CPF,
                        "Data de Criação": dependente["Data de Criação"],
                      }}
                      type="dependentes"
                    />
                  )}
                  emptyMessage="Nenhum dependente encontrado."
                />

                <RenderExpandableSection
                  title="Reservas"
                  data={data.reservations}
                  renderItem={(reservation) => (
                    <Ticket
                      key={reservation.id}
                      data={reservation}
                      type="reservas"
                    />
                  )}
                  emptyMessage="Nenhuma reserva encontrada."
                />
              </>
            ) : type === "reserva" && (
              <>
                <ExpandableSection title="Clientes">
                  <Ticket
                    key={data.idCustomer}
                    data={{
                      ID: data.idCustomer,
                      Nome: data.customerName,
                    }}
                    type="clientes"
                  />
                </ExpandableSection>
              </>
            )}
          </div>
        </div>
      )}
    </Container>

  );
}

export default Object;
