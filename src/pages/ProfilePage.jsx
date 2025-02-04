import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import './ProfilePage.modal.css';



const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '', // Inicialize os valores como strings vazias
    email: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError(err.message);
    }
  };

  return (
    <div className="profile-page">
      <h1>Perfil</h1>
      {error && <p className="error">Erro: {error}</p>}
      <form>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Salvar
        </button>
      </form>
    </div>
  );
  
};

export default ProfilePage;
