import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FormPage from './pages/FormPage';
import ListPage from './pages/ListPage';
import NavBar from './components/Navbar';
import ProductForm from './pages/ProductForm';
import ProductListPage from './pages/ProductListPage';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/' || location.pathname === '/form';

  return (
    <div>
      {!hideNavBar && <NavBar />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/form" element={<FormPage />} /> {/* Adicione esta rota */}
          <Route path="/list" element={<ListPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductForm />} />  {/* Para editar */}
          <Route path="/product" element={<ProductForm />} />  {/* Para adicionar */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
