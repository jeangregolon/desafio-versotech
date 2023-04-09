import React from 'react';
import './style.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <img className="loading-image" src={'/pokeball.png'} alt={'erro'} />
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
