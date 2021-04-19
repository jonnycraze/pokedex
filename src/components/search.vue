<template>
  <div class="search">
    <b-form-input 
      v-model="query"
      placeholder="Search for a Pokemon"
      @input="findMatches"
      tabindex="0"
    />
    <div class="results text-capitalize" v-if="matches">
      <ul class="list">
        <li 
          tabindex="0"
          class="list-item"
          v-for="pokemon in matches" 
          :key="`search-match-${pokemon.name}`"
          @click="select(pokemon.name)"
        >
          {{pokemon.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'pokemon-search',
  data() {
    return {
      matches: null,
      query: null,
    };
  },
  methods: {
    ...mapActions([
      'setSelectedPokemon',
    ]),
    findMatches(value) {
      this.matches = value
        ? this.$store.getters.getPokemonMatches(value)
        : null;
    },
    select(value) {
      this.setSelectedPokemon(value);
      this.matches = null;
      this.query = null;
    }
  },
}
</script>
<style scoped lang="scss">
  .search {
    position: relative;

    .results {
      background: #FFF;
      position: absolute;
      top: 38px; left: 0;
      width: 100%;
      z-index: 100;
      box-shadow: 0 0 6px rgba($color: #000, $alpha: 0.5);
    }
  }
</style>