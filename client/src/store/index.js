import Vue from 'vue';
import Vuex from 'vuex';
import {
  getRecentShouts,
  getAllShouts,
  getRankedByMonth,
  getAllUsers,
  getUserShoutoutsByType,
} from '../shared/apiCalls';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    shoutouts: [],
    recentShoutouts: [],
    rankedUsers: [],
    user: {
      shoutoutsReceived: [],
      shoutoutsGiven: [],
      summary: {},
    },
    loading: {
      users: false,
      shoutouts: false,
      recentShoutouts: false,
      rankedUsers: false,
      user: false,
    },
  },
  // direct store changes
  mutations: {
    updateUsers(state, users) {
      state.users = users || [];
    },
    updateShoutouts(state, shoutouts) {
      state.shoutouts = shoutouts || [];
    },
    updateRecentShoutouts(state, recentShoutouts) {
      state.recentShoutouts = recentShoutouts || [];
    },
    updateRankedUsers(state, ranked) {
      state.rankedUsers = ranked || [];
    },
    updateUserShoutoutsGiven(state, shoutouts) {
      state.user.shoutoutsGiven = shoutouts || [];
    },
    updateUserShoutoutsReceived(state, shoutouts) {
      state.user.shoutoutsReceived = shoutouts || [];
    },
    updateUserSummary(state, userId) {
      const userIndex = state.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) state.user.summary = {};
      else {
        state.user.summary = {
          total_shoutouts_given: state.users[userIndex].num_shoutouts_given,
          total_shoutouts_received:
            state.users[userIndex].num_shoutouts_received,
          most_company_value_given:
            state.users[userIndex].most_company_value_given,
          most_company_value_received:
            state.users[userIndex].most_company_value_received,
        };
      }
    },
    updateLoading(state, { data, isLoading }) {
      state.loading[data] = isLoading;
    },
  },
  // async changes (api calls)
  actions: {
    async getUsers({ commit }) {
      commit('updateLoading', { data: 'users', isLoading: true });
      try {
        const users = await getAllUsers();
        commit('updateUsers', users);
      } catch (e) {
        console.error;
      }
      commit('updateLoading', { data: 'users', isLoading: false });
    },
    async getShouts({ commit }, { startDate, endDate }) {
      commit('updateLoading', { data: 'shoutouts', isLoading: true });
      try {
        const shoutouts = await getAllShouts(startDate, endDate);
        commit('updateShoutouts', shoutouts);
      } catch (e) {
        console.error;
      }
      commit('updateLoading', { data: 'shoutouts', isLoading: false });
    },
    async getRecentShoutouts({ commit }) {
      commit('updateLoading', { data: 'recentShoutouts', isLoading: true });
      try {
        const recentShoutouts = await getRecentShouts();
        commit('updateRecentShoutouts', recentShoutouts);
      } catch (e) {
        console.error;
      }
      commit('updateLoading', { data: 'recentShoutouts', isLoading: false });
    },
    async getRankedUsersByMonth({ commit }, { type, month, year }) {
      commit('updateLoading', { data: 'rankedUsers', isLoading: true });
      try {
        const ranked = await getRankedByMonth(type, month, year);
        commit('updateRankedUsers', ranked);
      } catch (e) {
        console.error;
      }
      commit('updateLoading', { data: 'rankedUsers', isLoading: false });
    },
    async getUserShoutoutsByType(
      { commit },
      { userId, type, startDate, endDate }
    ) {
      commit('updateLoading', { data: 'user', isLoading: true });
      try {
        const shoutouts = await getUserShoutoutsByType(
          userId,
          type,
          startDate,
          endDate
        );
        if (type === 'shoutee')
          commit('updateUserShoutoutsReceived', shoutouts);
        else commit('updateUserShoutoutsGiven', shoutouts);
        commit('updateUserSummary', userId);
      } catch (e) {
        console.error;
      }
      commit('updateLoading', { data: 'user', isLoading: false });
    },
  },
  // similar to computed properties
  getters: {},
});
