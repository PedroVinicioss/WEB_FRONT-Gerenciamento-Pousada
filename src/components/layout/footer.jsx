import styles from "../../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Gerenciador de Pousada - {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
