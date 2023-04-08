import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../../store/storeConfig';
import './style.css';
import Error from '../error';
import Loading from '../../loading';

const renderStats = (stats) => {
  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) => (
          <tr key={stat.stat.name}>
            <td>{stat.stat.name}</td>
            <td>{stat.base_stat}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const pokemon = useSelector((state) => state.pokemonDetails);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getPokemonDetails(name));
  }, [dispatch, name]);

  if (!pokemon || loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="pokemon-detail">
      <h1 className="pokemon-name">{pokemon.name}</h1>
      <img
        className="pokemon-image"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="wrapper">
        <div className="left-column">
          <h2 className="pokemon-types-heading">Tipos:</h2>
          <ul className="pokemon-types-list">
            {pokemon.types.map((type) => (
              <li key={type.type.name} className={`${type.type.name}`}>
                {type.type.name}
              </li>
            ))}
          </ul>
          <h2 className="pokemon-abilities-heading">Habilidades:</h2>
          <ul className="pokemon-abilities-list">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="pokemon-ability">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-column">
          <h2 className="pokemon-stats-heading">Status:</h2>
          {renderStats(pokemon.stats)}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
