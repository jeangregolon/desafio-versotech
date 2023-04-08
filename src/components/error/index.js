import React from 'react';
import './style.css';

const Error = () => {
  return (
    <div className="error-container">
      <img className="error-image" src={'/error.png'} alt={'erro'} />
      <p>Algo deu errado. Tente novamente mais tarde.</p>
    </div>
  );
};

export default Error;
