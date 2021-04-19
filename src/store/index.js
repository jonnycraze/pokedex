import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function alphaSortPokemon(a, b) {
  // debugger;
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export default new Vuex.Store({
  state: {
    pokemon: null,
    filteredResults: null,
    filterBy: null,
    activePokemon: null,
    queries: [],
    types: [],
  },
  getters: {
    getPokemonMatches: (state) => (query) => {
      state.queries.push(query);
      return state.pokemon
        .filter(p => p.name.toLowerCase().indexOf(query.toLowerCase()) > -1 )
        .slice(0, 10)
        .sort(alphaSortPokemon);
    },
    activePokemon(state) {
      return state.activePokemon;
    },
    filteredResults(state) {
      return state.filteredResults;
    },
    filterBy(state) {
      return state.filterBy;
    }
  },
  mutations: {
    POKEMON(state, data) {
      state.pokemon = data;
    },
    SELECTED_POKEMON(state, data) {
      state.activePokemon = data.details;
      state.activePokemon.speciesDetails = data.species;
      state.activePokemon.evolution = data.evolution;
      state.filteredResults = null;

      state.pokemon.map(p => {
        if (p.name === data.details.name) {
          p = state.activePokemon;
        }
      });
    },
    FILTER_BY_TYPE(state, data) {
      if (!state.types.some(type => type.name === data.name)) {
        state.types.push(data);
      }
      state.filterBy = {
        name: 'Type',
        value: data.name,
      }
      state.filteredResults = data.pokemon;
    },
  },
  actions: {
    async getAllPokemon({ commit }) {
      let response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1200');
      commit('POKEMON', response.data.results);
    },
    async setSelectedPokemon({ commit }, search) {
      let response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + search);
      let species = await axios.get(response.data.species.url);
      let evolution = await axios.get(species.data.evolution_chain.url);
      commit('SELECTED_POKEMON', 
        {
          details: response.data, 
          species: species.data,
          evolution: evolution.data,
        }
      );
    },
    async filterPokemonByType({ commit }, type) {
      let response = await axios.get('https://pokeapi.co/api/v2/type/' + type);
      commit('FILTER_BY_TYPE', response.data);
    },
  },
})
