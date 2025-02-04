import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './LoginPage.modal.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    try {
      // Faz o login usando o método da API
      const user = await login({ email, password });

      console.log('Login bem-sucedido:', user);

      // Salva os dados do usuário no localStorage
      const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
      localStorage.setItem('token', token);

      alert('Login realizado com sucesso!');
      navigate('/products');
    } catch (err) {
      console.error('Erro ao fazer login:', err.message);
      setError(err.response?.data?.message || 'Erro ao realizar o login.');
    }
  };

  const goToRegister = () => {
    navigate('/form');
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            aria-label="Campo de email"
            required
          />
        </div>
        <div className="input-group password-group">
          <label htmlFor="password">Senha:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            aria-label="Campo de senha"
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            role="button"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            👁️
          </span>
        </div>
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>Não tem uma conta?</p>
      <button type="button" onClick={goToRegister} className="register-button">
        Cadastrar-se
      </button>
    </div>
  );
};

export default LoginPage;
