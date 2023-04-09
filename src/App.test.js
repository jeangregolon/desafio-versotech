import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getPokemonsRequest,
  getPokemonsSuccess,
  getPokemonsFailure,
  getPokemonDetailsRequest,
  getPokemonDetailsSuccess,
  getPokemonDetailsFailure,
  getPokemons,
  getPokemonDetails,
} from './index';

const mockStore = configureMockStore([thunk]);

describe('Redux actions', () => {
  it('should create an action to get pokemons request', () => {
    const expectedAction = { type: 'GET_POKEMONS_REQUEST' };
    expect(getPokemonsRequest()).toEqual(expectedAction);
  });

  it('should create an action to get pokemons success', () => {
    const pokemons = [{ name: 'Pikachu' }, { name: 'Charmander' }];
    const expectedAction = { type: 'GET_POKEMONS_SUCCESS', payload: pokemons };
    expect(getPokemonsSuccess(pokemons)).toEqual(expectedAction);
  });

  it('should create an action to get pokemons failure', () => {
    const error = 'Failed to fetch pokemons';
    const expectedAction = { type: 'GET_POKEMONS_FAILURE', payload: error };
    expect(getPokemonsFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to get pokemon details request', () => {
    const expectedAction = { type: 'GET_POKEMON_DETAILS_REQUEST' };
    expect(getPokemonDetailsRequest()).toEqual(expectedAction);
  });

  it('should create an action to get pokemon details success', () => {
    const pokemonDetails = { name: 'Pikachu', id: 25 };
    const expectedAction = {
      type: 'GET_POKEMON_DETAILS_SUCCESS',
      payload: pokemonDetails,
    };
    expect(getPokemonDetailsSuccess(pokemonDetails)).toEqual(expectedAction);
  });

  it('should create an action to get pokemon details failure', () => {
    const error = 'Failed to fetch pokemon details';
    const expectedAction = {
      type: 'GET_POKEMON_DETAILS_FAILURE',
      payload: error,
    };
    expect(getPokemonDetailsFailure(error)).toEqual(expectedAction);
  });
});

describe('Redux async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      loading: false,
      pokemons: [],
      pokemonDetails: null,
      error: null,
    });
  });

  it('should dispatch GET_POKEMONS_SUCCESS when fetching pokemons has been done', async () => {
    const pokemons = [{ name: 'Pikachu' }, { name: 'Charmander' }];
    axios.get.mockResolvedValueOnce({ data: { results: pokemons } });

    await store.dispatch(getPokemons());

    expect(store.getActions()).toEqual([
      getPokemonsRequest(),
      getPokemonsSuccess(pokemons),
    ]);
  });

  it('should dispatch GET_POKEMONS_FAILURE when fetching pokemons has failed', async () => {
    const error = 'Failed to fetch pokemons';
    axios.get.mockRejectedValueOnce(new Error(error));

    await store.dispatch(getPokemons());

    expect(store.getActions()).toEqual([
      getPokemonsRequest(),
      getPokemonsFailure(error),
    ]);
  });

  it('should dispatch GET_POKEMON_DETAILS_SUCCESS when fetching pokemon details has been done', async () => {
    const pokemonDetails = { name: 'Pikachu', id: 25 };
    const pokemonNameOrId = 'pikachu';
    axios.get.mockResolvedValueOnce({ data: pokemonDetails });
    await store.dispatch(getPokemonDetails(pokemonNameOrId));

    expect(store.getActions()).toEqual([
      getPokemonDetailsRequest(),
      getPokemonDetailsSuccess(pokemonDetails),
    ]);
  });

  it('should dispatch GET_POKEMON_DETAILS_FAILURE when fetching pokemon details has failed', async () => {
    const error = 'Failed to fetch pokemon details';
    const pokemonNameOrId = 'invalid-pokemon-name';
    axios.get.mockRejectedValueOnce(new Error(error));
    await store.dispatch(getPokemonDetails(pokemonNameOrId));

    expect(store.getActions()).toEqual([
      getPokemonDetailsRequest(),
      getPokemonDetailsFailure(error),
    ]);
  });
});
