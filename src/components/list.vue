<template>
  <div class="pokemon-list">
    <div v-if="filterBy" class="h4 text-capitalize">
      Filter By: {{filterBy.value}} {{filterBy.name}}
    </div>
    <ul class="list">
      <!-- <pre>{{data}}</pre> -->
      <li 
        class="text-capitalize list-item" 
        v-for="pokemon in data" 
        :key="pokemon.name" 
        @click="setSelectedPokemon(pokemon.pokemon.name)"
      >
        {{pokemon.pokemon.name}}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Type from './type';

export default {
  name: 'pokemon-list',
  components: {
    [Type.name]: Type,
  },
  props: {
    data: {
      type: Array,
      required: false,
    },
    filterBy: {
      type: Object,
      required: false,
    }
  },
  methods: {
    ...mapActions([
      'setSelectedPokemon',
    ]),
  }
}
</script>
<style scoped lang="scss">
  .pokemon-list {
    padding-top: 2rem;
  }
</style>