import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  loading: false,
  pokemons: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POKEMONS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_POKEMONS_SUCCESS':
      return {
        ...state,
        loading: false,
        pokemons: action.payload,
      };
    case 'GET_POKEMONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const getPokemonsRequest = () => {
  return {
    type: 'GET_POKEMONS_REQUEST',
  };
};

const getPokemonsSuccess = (pokemons) => {
  return {
    type: 'GET_POKEMONS_SUCCESS',
    payload: pokemons,
  };
};

const getPokemonsFailure = (error) => {
  return {
    type: 'GET_POKEMONS_FAILURE',
    payload: error,
  };
};

const getPokemons = () => {
  return (dispatch) => {
    dispatch(getPokemonsRequest());
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((response) => {
        const pokemons = response.data.results;
        dispatch(getPokemonsSuccess(pokemons));
      })
      .catch((error) => {
        dispatch(getPokemonsFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export { getPokemons, store };
