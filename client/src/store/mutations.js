import {
  companyValuesFormatter,
  rankedShoutersFormatter,
  shoutoutFormatter,
} from '../shared/formatters';

const updateCompanyValues = (state, values) => {
  state.companyValues = companyValuesFormatter(values) || [];
};

const updateLoading = (state, { data, isLoading }) => {
  state.loading[data] = isLoading;
};

const updateRankedUsers = (state, ranked) => {
  state.rankedUsers = rankedShoutersFormatter(ranked) || [];
};

const updateRecentShoutouts = (state, recentShoutouts) => {
  state.recentShoutouts = recentShoutouts || [];
};

const updateShoutouts = (state, shoutouts) => {
  state.shoutouts = shoutoutFormatter(shoutouts) || [];
};

const updateUserShoutoutsGiven = (state, shoutouts) => {
  state.user.shoutoutsGiven = shoutouts || [];
};

const updateUserShoutoutsReceived = (state, shoutouts) => {
  state.user.shoutoutsReceived = shoutouts || [];
};

const updateUserSummary = (state, userId) => {
  const userIndex = state.users.findIndex((user) => user.id === userId);
  state.user.summary = userIndex !== -1 ? state.users[userIndex] : {};
};

const updateUsers = (state, users) => {
  state.users = users || [];
};

// direct store changes
export default {
  updateCompanyValues,
  updateLoading,
  updateRankedUsers,
  updateRecentShoutouts,
  updateShoutouts,
  updateUserShoutoutsGiven,
  updateUserShoutoutsReceived,
  updateUserSummary,
  updateUsers,
};
