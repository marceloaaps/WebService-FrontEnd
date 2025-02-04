import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavBar = () => {
  const location = useLocation();

  // Condição para esconder a NavBar em páginas específicas
  const hideNavBar = location.pathname === '/' || location.pathname === '/form';

  if (hideNavBar) return null; // Não renderiza a NavBar se estiver nas páginas de login ou formulário

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-brand']}>
        <h1>Sistema de Produtos</h1>
      </div>
      <ul className={styles['navbar-links']}>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        <li>
          <Link to="/product">Adicionar Produto</Link>
        </li>
        <li>
          <Link to="/">Sair</Link> {/* Adicione a lógica de logout conforme necessário */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
