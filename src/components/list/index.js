import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import Card from '../card';
import { getPokemons } from '../../store/storeConfig';
import Error from '../error';
import Loading from '../../loading';

const PokemonList = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonName, setPokemonName] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([1, 2, 3]);

  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (pokemonName) return;
    setNotFound(false);
    setTotalPages(Math.floor(Object.keys(pokemons).length / itemsPerPage));

    const [first, last] = getPageRange(currentPage, itemsPerPage);
    setList(pokemons.slice(first, last));

    const pages = getPages(currentPage, totalPages);
    setPages(pages);
  }, [pokemons, itemsPerPage, currentPage, pokemonName]);

  useEffect(() => {
    if (!pokemonName) return;

    const filteredList = pokemons.filter(
      (pokemon) =>
        pokemon &&
        pokemon.name &&
        pokemon.name.includes(pokemonName.toLowerCase())
    );
    if (filteredList.length === 0) {
      setNotFound(true);
      return;
    }

    const totalPages = Math.floor(filteredList.length / itemsPerPage);
    setTotalPages(totalPages);

    const [first, last] = getPageRange(currentPage, itemsPerPage);
    setList(filteredList.slice(first, last));

    const pages = getPages(currentPage, totalPages);
    setPages(pages);
    setNotFound(false);
  }, [pokemonName]);

  const getPageRange = (currentPage, itemsPerPage) => {
    const first = (currentPage - 1) * itemsPerPage;
    const last = first + itemsPerPage;
    return [first, last];
  };

  const getPages = (currentPage, totalPages) => {
    if (totalPages <= 3) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    } else if (currentPage === 1 || currentPage === 2) {
      return [1, 2, 3];
    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const handlePage = (action) => {
    switch (action) {
      case 'first':
        setCurrentPage(1);
        break;
      case 'prev':
        currentPage > 1 && setCurrentPage(currentPage - 1);
        break;
      case 'next':
        setCurrentPage(currentPage + 1);
        break;
      case 'last':
        setCurrentPage(totalPages);
        break;
      default:
        break;
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const name = event.target.value;
    setPokemonName(name);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <div className="search-container">
          <span>
            <input
              className="input-search"
              type="text"
              placeholder="Pesquisar por nome..."
              onChange={handleSearch}
            />
          </span>
          <span className="span-select">
            <p className="select-label">Itens por página:</p>
            <div className="select">
              <select
                className="select-field"
                onChange={(e) => {
                  setItemsPerPage(e.target.value);
                  setCurrentPage(1);
                }}
                value={itemsPerPage}
              >
                <option selected disabled></option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
              </select>
            </div>
          </span>
        </div>
      </div>
      <div className="list">
        <div className="card-container">
          {notFound && <h2>Nenhum resultado encontrado.</h2>}
          {loading && <Loading />}
          {error && <Error />}
          {!notFound &&
            !loading &&
            !error &&
            list.map((pokemon) => <Card name={pokemon.name} />)}
        </div>
      </div>

      {!notFound && !loading && !error && (
        <div className="center">
          <ul className="pagination">
            <li>
              <button
                className={currentPage === 1 ? 'disabled' : ''}
                onClick={() => handlePage('first')}
              >
                «
              </button>
            </li>
            <li>
              <button
                className={currentPage === 1 ? 'disabled' : ''}
                onClick={() => handlePage('prev')}
              >
                &lsaquo;
              </button>
            </li>
            {pages.map((page) => {
              return (
                <li>
                  <button
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                className={currentPage === totalPages ? 'disabled' : ''}
                onClick={() => handlePage('next')}
              >
                &rsaquo;
              </button>
            </li>
            <li>
              <button
                className={currentPage === totalPages ? 'disabled' : ''}
                onClick={() => handlePage('last')}
              >
                »
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
