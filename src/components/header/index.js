import React from 'react';
import "./style.css"

const Header = () => {

  return (
    <header className="pokemon-header">
      <img src="/pokeball.png" className="pokemon-logo" alt="logo" />
      <h1 className="pokemon-title">Pokédex</h1>
    </header>
  );
};

export default Header;