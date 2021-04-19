<template>
  <div class="container">
    <h1 class="h3">
      Jon's Pokedex
    </h1>
    <pokemon-search />
    <pokemon-list v-if="filteredResults" :data="filteredResults" :filter-by="filterBy" />
    <pokemon-information v-else />
    <!-- 
      sidebar
        recent searches
        recent selections
    -->
    <!-- 
      main window
        selected pokemon
          clicking evolution selects that pokemon
    -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Search from '@/components/search';
import Information from '@/components/information';
import List from '@/components/list';

export default {
  name: 'Home',
  components: {
    [Search.name]: Search,
    [Information.name]: Information,
    [List.name]: List,
  },
  computed: {
    ...mapGetters(['activePokemon', 'filteredResults', 'filterBy']),
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 6rem 4rem;
}
</style>