import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
  },
]

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  // my ajax call
  if (!store.state.pokemon) {
    await store.dispatch('getAllPokemon');
  }
  next();
});

export default router
