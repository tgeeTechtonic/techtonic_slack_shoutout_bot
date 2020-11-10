import Vue from 'vue';
import Vuex from 'vuex';
import {
  getRecentShouts,
  getAllShouts,
  getRankedByMonth,
  getAllUsers,
} from '../shared/apiCalls';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    shoutouts: [],
    recentShoutouts: [],
    rankedUsers: [],
  },
  // direct store changes
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    },
    updateShoutouts(state, shoutouts) {
      state.shoutouts = shoutouts;
    },
    updateRecentShoutouts(state, recentShoutouts) {
      state.recentShoutouts = recentShoutouts;
    },
    updateRankedUsers(state, ranked) {
      state.rankedUsers = ranked;
    },
  },
  // async changes (api calls)
  actions: {
    async getUsers({ commit }) {
      try {
        const users = await getAllUsers();
        commit('updateUsers', users);
      } catch (e) {
        console.error;
      }
    },
    async getShouts({ commit }) {
      try {
        const shoutouts = await getAllShouts();
        commit('updateShoutouts', shoutouts);
      } catch (e) {
        console.error;
      }
    },
    async getRecentShoutouts({ commit }) {
      try {
        const recentShoutouts = await getRecentShouts();
        commit('updateRecentShoutouts', recentShoutouts);
      } catch (e) {
        console.error;
      }
    },
    async getRankedUsersByMonth({ commit }, { type, month, year }) {
      try {
        const ranked = await getRankedByMonth(type, month, year);
        commit('updateRankedUsers', ranked);
      } catch (e) {
        console.error;
      }
    },
  },
  // similar to computed properties
  getters: {},
});
