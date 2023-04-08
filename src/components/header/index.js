import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="pokemon-header">
      <div>
        <img
          src="/pokeball.png"
          className="pokemon-logo"
          alt="logo"
          onClick={() => {
            navigate('/');
          }}
        />
        <h1
          className="pokemon-title"
          onClick={() => {
            navigate('/');
          }}
        >
          Pokédex
        </h1>
      </div>
    </header>
  );
};

export default Header;
