import React from 'react';
import './style.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img className="not-found-image" src={'/sad-pokemon.png'} alt={'erro'} />
      <p>Nenhum Pokémon encontrado. Tente novamente.</p>
    </div>
  );
};

export default NotFound;
