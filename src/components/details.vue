<template>
  <b-card no-body class="mt-3 text-capitalize">
      <b-tabs card>
        <b-tab title="Evolutions" active>
          <b-card-text>
            <b-row>
              <b-col 
                cols="4" 
                class="evolution" 
                :class="{'active-pokemon': isCurrentPokemon(firstEvolution.name)}"
                @click="setSelectedPokemon(firstEvolution.name)"
              >
                <img :src="firstEvolution.image" />
                {{firstEvolution.name}}
              </b-col>
              <b-col 
                v-if="secondEvolution" 
                cols="4" 
                class="evolution" 
                :class="{'active-pokemon': isCurrentPokemon(secondEvolution.name)}"
                @click="setSelectedPokemon(secondEvolution.name)"
              >
                <img :src="secondEvolution.image" />
                {{secondEvolution.name}}
              </b-col>
              <b-col 
                v-if="thirdEvolution" 
                cols="4" 
                class="evolution" 
                :class="{'active-pokemon': isCurrentPokemon(thirdEvolution.name)}"
                @click="setSelectedPokemon(thirdEvolution.name)"
              >
                <img :src="thirdEvolution.image" />
                {{thirdEvolution.name}}
              </b-col>
            </b-row>
          </b-card-text>
        </b-tab>
        <b-tab title="Moves">
          <b-card-text>
            <b-row>
              <b-col cols="2" v-for="move in activePokemon.moves" :key="move.name">
                {{move.move.name}}
              </b-col>
            </b-row>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'pokemon-details',
  data() {
    return {
      imageBaseUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    }
  },
  computed: {
    ...mapGetters(['activePokemon']),
    firstEvolution() {
      let id = this.activePokemon.evolution.chain.species.url.split('/pokemon-species/');
      return {
        name: this.activePokemon.evolution.chain.species.name,
        image: this.imageBaseUrl + id[1].replace('/','') + '.png',
      }
    },
    secondEvolution() {
      if (this.activePokemon.evolution.chain.evolves_to.length) {
        let id = this.activePokemon.evolution.chain.evolves_to[0].species.url.split('/pokemon-species/');
        return {
          name: this.activePokemon.evolution.chain.evolves_to[0].species.name,
          image: this.imageBaseUrl + id[1].replace('/','') + '.png',
        }
      }
      return null;
    },
    thirdEvolution() {
      if (this.activePokemon.evolution.chain.evolves_to.length && this.activePokemon.evolution.chain.evolves_to[0].evolves_to.length) {
        let id = this.activePokemon.evolution.chain.evolves_to[0].evolves_to[0].species.url.split('/pokemon-species/');
        return {
          name: this.activePokemon.evolution.chain.evolves_to[0].evolves_to[0].species.name,
          image: this.imageBaseUrl + id[1].replace('/','') + '.png',
        }
      }

      return null;
    }
  },
  methods: {
    ...mapActions([
      'setSelectedPokemon',
    ]),
    isCurrentPokemon(pokemon) {
      return pokemon === this.activePokemon.name;
    }
  }
}
</script>
<style scoped lang="scss">
  .evolution {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
      background: #f3f3f3;
    }
    
    &.active-pokemon {
      background: #eaf8ff;
      border: 1px solid #b6daeb;

      &:hover {
        background: #ddeef7;
      }
    }
  }
</style>