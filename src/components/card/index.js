import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Card = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/pokemon/${name}`);
      }}
    >
      <h2 class="card-title">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
    </div>
  );
};

export default Card;
