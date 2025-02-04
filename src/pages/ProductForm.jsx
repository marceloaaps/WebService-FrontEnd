import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, createProduct, updateProduct, getCategories } from '../services/api';
import './ProductForm.modal.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data);

        if (id) {
          const productResponse = await getProduct(id);
          const { name, description, price, imgUrl, categories } = productResponse.data;
          setName(name);
          setDescription(description);
          setPrice(price);
          setImgUrl(imgUrl);

          const categoryIds = categories.map((category) => category.id);
          setSelectedCategories(categoryIds);
        }
      } catch (error) {
        console.error('Erro ao carregar produto e categorias:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const productData = {
        name,
        description,
        price,
        imgUrl,
        categories: selectedCategories.map((categoryId) => ({ id: categoryId })),
      };
      if (id) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }
      alert('Produto salvo com sucesso!');
      navigate('/products');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar o produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  return (
    <div className="product-form">
      <h1>{id ? 'Editar Produto' : 'Adicionar Novo Produto'}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {id ? (
          <div>
            <label>Preço:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço do Produto"
              required
            />
          </div>
        ) : (
          <>
            <div>
              <label>Nome do Produto:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do Produto"
                required
              />
            </div>
            <div>
              <label>Descrição:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do Produto"
              />
            </div>
            <div>
              <label>Preço:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Preço do Produto"
                required
              />
            </div>
            <div>
              <label>URL da Imagem:</label>
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="URL da Imagem do Produto"
              />
            </div>
            <div>
              <label>Categorias:</label>
              <select
                multiple={true}
                value={selectedCategories}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Salvando...' : id ? 'Salvar Preço' : 'Salvar Produto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
