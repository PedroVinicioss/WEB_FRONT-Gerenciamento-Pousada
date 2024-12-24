import styles from "../styles/Quartos.module.css";
import Container from "../components/layout/container";
import { useState } from "react";

function Quartos() {
  const [quartos, setQuartos] = useState([
    {
      id: 1,
      nome: "Quarto 1",
      descricao: "Quarto com cama de casal, ar condicionado e TV.",
      imagem: "https://www.shutterstock.com/image-photo/luxury-hotel-room-modern-classic-260nw-2521917539.jpg",
    },
    {
      id: 2,
      nome: "Quarto 2",
      descricao: "Quarto com duas camas de solteiro, ar condicionado e TV.",
      imagem: "https://www.shutterstock.com/image-photo/luxury-hotel-room-modern-classic-260nw-2521917539.jpg",
    },
    {
      id: 3,
      nome: "Quarto 3",
      descricao: "Quarto com cama de casal, ar condicionado e vista para o mar.",
      imagem: "https://www.shutterstock.com/image-photo/luxury-hotel-room-modern-classic-260nw-2521917539.jpg",
    },
  ]);

  return (
    <>
      <Container>
        <div className={styles.quartos}>
          {quartos.map((quarto) => (
            <div key={quarto.id} className={styles.card}>
              <img
                src={quarto.imagem}
                alt={`Imagem do ${quarto.nome}`}
                className={styles.cardimage}
              />
              <div className={styles.cardbody}>
                <h5 className={styles.cardtitle}>{quarto.nome}</h5>
                <p className={styles.cardtext}>{quarto.descricao}</p>
                <a href="#" className={styles.btn}>
                  Reservar
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Quartos;
