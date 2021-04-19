<template>
  <b-card border-variant="secondary" v-if="activePokemon" class="mt-3">
    <b-card>
      <b-row>
        <b-col cols="2" class="text-center centered-content">
          <b-img :src="activePokemon.sprites.front_default" fluid :alt="activePokemon.name" />
        </b-col>
        <b-col>
          <h1 class="text-uppercase">{{activePokemon.name}}</h1>
          <p>{{about}}</p>
          <div>
            Height {{activePokemon.height}}
            Weight {{activePokemon.weight}}
          </div>
          <div class="text-capitalize">
            Type:
            <pokemon-type 
              v-for="type in activePokemon.types"
              :key="type.type.name"
              :name="type.type.name"
              actionable
            />
          </div>
        </b-col>
      </b-row>
    </b-card>

    <b-row>
      <b-col cols="3">
        <b-card bg-variant="light" border-variant="secondary" header-border-variant="secondary" header="Stats" class="mt-3 text-capitalize">
          <!-- <b-row> -->
            <p v-for="stat in activePokemon.stats" :key="stat.stat.name">
              {{stat.stat.name}}: {{stat.base_stat}}
            </p>
          <!-- </b-row> -->
        </b-card>
      </b-col>
      <b-col cols="9">
        <pokemon-details />
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import { mapGetters } from 'vuex';
import Type from './type';
import Details from './details';

export default {
  name: 'pokemon-information',
  components: {
    [Details.name]: Details,
    [Type.name]: Type,
  },
  computed: {
    ...mapGetters(['activePokemon']),
    about() {
      return this.activePokemon.speciesDetails.flavor_text_entries[7].flavor_text.replace('', ' ');
    }
  },
}
</script>
<style scoped lang="scss">
  .centered-content {
    align-items: center;
    align-content: center;
    display: flex;
    justify-content: center;
  }
</style>