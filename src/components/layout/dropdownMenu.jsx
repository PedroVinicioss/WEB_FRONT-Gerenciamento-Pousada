import React, { useState } from "react";
import styles from "../../styles/dropdownMenu.module.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        Ações {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>Seguir</li>
            <li className={styles.menuItem}>Exibir todas as propriedades</li>
            <li className={styles.menuItem}>Exibir histórico da propriedade</li>
            <li className={styles.menuItem}>Ver histórico de associação</li>
            <li className={styles.menuItem}>
              <span className={styles.icon}>★</span> Resumir
            </li>
            <li className={styles.menuItem}>Pesquisa no Google</li>
            <li className={styles.menuItem}>Optar por não receber email</li>
            <li className={styles.menuItem}>Restaurar atividade</li>
            <li className={styles.menuItem}>Ver acesso ao registro</li>
            <li className={styles.menuItem}>Mesclar</li>
            <li className={styles.menuItem}>Excluir</li>
            <li className={styles.menuItem}>Exportar dados de contato</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
