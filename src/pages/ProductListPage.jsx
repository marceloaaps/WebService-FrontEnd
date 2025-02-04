import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct, getCategories } from '../services/api';
import './ProductListPage.modal.css'; // Importação do arquivo de estilo

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProducts();
        const categoriesResponse = await getCategories();

        console.log('Produtos carregados:', productsResponse.data);
        console.log('Categorias carregadas:', categoriesResponse.data);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar produtos e categorias:', error);
      }
    };

    fetchData();
  }, []);

  const findCategoriesForProduct = (product) => {
    if (!product.categories || product.categories.length === 0) {
      return 'Sem categoria';
    }

    return product.categories.map((category) => category.name).join(', ');
  };

  const handleEdit = (id) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className="product-list-page">
      <h1>Lista de Produtos</h1>
      <button onClick={() => navigate('/product')}>Adicionar Novo Produto</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Categorias</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description || 'Sem descrição'}</td>
              <td>{product.price}</td>
              <td>{findCategoriesForProduct(product)}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(product.id)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;
