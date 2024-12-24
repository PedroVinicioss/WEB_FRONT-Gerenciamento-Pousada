import imgtext from "../../public/imgtext.jpg";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <>
      <div className={styles.infodiv}>
        <div className={styles.textinfo}>
          <h1>Home</h1>
          <p>Seja bem-vindo ao gerenciador de pousadas.</p>

          <p>
            Este é um sistema de gerenciamento de pousadas, onde você pode
            cadastrar, editar e excluir quartos, hóspedes e reservas.
          </p>

          <p>Para começar, clique em "Quartos" no menu acima.</p>

          <p>
            Este sistema foi desenvolvido com React, utilizando o Create React
            App, e utiliza o React Router para gerenciar as rotas.
          </p>

          <p>
            Os dados são armazenados no Local Storage do navegador, então ao
            recarregar a página, os dados permanecem salvos.
          </p>
        </div>

        <img className={styles.imginfo} src={imgtext} alt="" />
      </div>
    </>
  );
}

export default Home;
