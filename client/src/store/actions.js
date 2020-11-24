import {
  getRecentShouts,
  getAllShouts,
  getRankedByMonth,
  getAllUsers,
  getShoutoutsByType,
  getAllCompanyValues,
} from '../shared/apiCalls';

const getUsers = async ({ commit }) => {
  commit('updateLoading', { data: 'users', isLoading: true });
  try {
    const users = await getAllUsers();
    commit('updateUsers', users);
  } catch (e) {
    console.error;
  }
  commit('updateLoading', { data: 'users', isLoading: false });
};

const getShouts = async ({ commit }, { startDate, endDate }) => {
  commit('updateLoading', { data: 'shoutouts', isLoading: true });
  try {
    const shoutouts = await getAllShouts(startDate, endDate);
    commit('updateShoutouts', shoutouts);
  } catch (e) {
    console.error;
  }
  commit('updateLoading', { data: 'shoutouts', isLoading: false });
};

const getRecentShoutouts = async ({ commit }) => {
  commit('updateLoading', { data: 'recentShoutouts', isLoading: true });
  try {
    const recentShoutouts = await getRecentShouts();
    commit('updateRecentShoutouts', recentShoutouts);
  } catch (e) {
    console.error;
  }
  commit('updateLoading', { data: 'recentShoutouts', isLoading: false });
};

const getRankedUsersByMonth = async ({ commit }, { type, month, year }) => {
  commit('updateLoading', { data: 'rankedUsers', isLoading: true });
  try {
    const ranked = await getRankedByMonth(type, month, year);
    commit('updateRankedUsers', ranked);
  } catch (e) {
    console.error;
  }
  commit('updateLoading', { data: 'rankedUsers', isLoading: false });
};

const getUserShoutoutsByType = async (
  { commit },
  { userId, type, startDate, endDate }
) => {
  commit('updateLoading', { data: 'user', isLoading: true });
  try {
    const shoutouts = await getShoutoutsByType(
      userId,
      type,
      startDate,
      endDate
    );
    if (type === 'shoutee') commit('updateUserShoutoutsReceived', shoutouts);
    else commit('updateUserShoutoutsGiven', shoutouts);
    commit('updateUserSummary', userId);
  } catch (e) {
    console.error;
  }
  commit('updateLoading', { data: 'user', isLoading: false });
};

const getCompanyValues = async ({ commit }) => {
  try {
    const companyValues = await getAllCompanyValues();
    commit('updateCompanyValues', companyValues);
  } catch (e) {
    console.error;
  }
};

// async changes (api calls)
export default {
  getUsers,
  getShouts,
  getRecentShoutouts,
  getRankedUsersByMonth,
  getUserShoutoutsByType,
  getCompanyValues,
};
