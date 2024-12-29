import { Link } from "react-router-dom";
import logo from "../../../public/logo_pousada.png";
import Container from "./container";
import styles from "../../styles/navbar.module.css";

function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <Container>
          <h2 className={styles.logo}>
            <Link to="/">
              {/* <img className={styles.imglogo} src={logo} alt="" /> */}
              Estância das Cachoeiras
            </Link>
          </h2>

          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.item}>
              <Link to="/reservas">Reservas</Link>
            </li>
            <li className={styles.item}>
              <Link to="/quartos">Quartos</Link>
            </li>
            <li className={styles.item}>
              <Link to="/clientes">Clientes</Link>
            </li>
          </ul>
        </Container>
      </nav>
    </>
  );
}

export default Navbar;
