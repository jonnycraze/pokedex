<template>
  <span class="pokemon-type" :class="name" :key="name" @click="select">
    {{name}}
  </span>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'pokemon-type',
  props: {
    name: {
      type: String,
      required: true,
    },
    actionable: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    ...mapActions(['filterPokemonByType']),
    select() {
      if (this.actionable) {
        this.filterPokemonByType(this.name);
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .pokemon-type {
    cursor: pointer;
    font-weight: bold;
    padding: 0 .25rem;

    &.normal {color: #333;}
    &.flying {color: #ab6cbe;}
    &.water {color: #0b4e9b;}
    &.ice {color: #4ac5f6;}
    &.bug {color: #6c886c;}
    &.grass {color: #31a831;}
    &.fire {color: #f54506;}
    &.ground {color: #a78e7b;}
    &.rock {color: #795f4b;}
    &.dragon {color: #360657;}
    &.poison {color: #693b69;}
    &.electric {color: #c3c12c;}
    &.ghost {color: #4d2a4d;}
    &.psychic {color: #d430d4;}
    &.fairy {color: #f599f5;}
    &.fighting {color: #770d0d;}
    &.dark {color: #383532;}
    &.steel {color: #aaa;}
  }
</style>