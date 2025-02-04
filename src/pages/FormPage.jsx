import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';
import './FormPage.modal.css';

const FormPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      await createUser({ name, email, password });
      alert('Cadastro realizado com sucesso!');
      navigate('/'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      if (error.response && error.response.status === 409) {
        setError('Email já cadastrado. Use outro email.');
      } else {
        setError('Erro ao realizar o cadastro. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="form-page">
      <h1>Cadastrar-se</h1>
      <form>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <button type="button" onClick={goBackToLogin} className="back-button">
        Voltar para Login
      </button>
    </div>
  );
};

export default FormPage;
