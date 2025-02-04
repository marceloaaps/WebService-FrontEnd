import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL do backend
});

export const login = async ({ email, password }) => {
  // Faz uma requisição para buscar todos os usuários
  const response = await api.get('/users');

  // Filtra o usuário pelo email e senha fornecidos
  const user = response.data.find(
    (u) => u.email === email && u.password === password
  );

  // Se não encontrar o usuário, lança um erro
  if (!user) {
    throw new Error('Email ou senha inválidos.');
  }

  // Retorna o usuário encontrado
  return user;
};


export const createUser = (user) => api.post('/users', user);
export const getUsers = () => api.get('/users');
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getUserProfile = () => api.get('/users');
export const updateUserProfile = (user) => api.put('/users', user);

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const getCategories = () => api.get('/categories');

export const updateProduct = (id, productData) => {
  console.log('Atualizando produto com ID:', id, 'Dados:', productData); // Log para verificar os dados
  return api.put(`/products/${id}`, productData);
};


export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
