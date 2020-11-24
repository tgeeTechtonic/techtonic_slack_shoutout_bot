const updateUsers = (state, users) => {
  state.users = users || [];
};
const updateShoutouts = (state, shoutouts) => {
  state.shoutouts = shoutouts || [];
};
const updateRecentShoutouts = (state, recentShoutouts) => {
  state.recentShoutouts = recentShoutouts || [];
};
const updateRankedUsers = (state, ranked) => {
  state.rankedUsers = ranked || [];
};
const updateUserShoutoutsGiven = (state, shoutouts) => {
  state.user.shoutoutsGiven = shoutouts || [];
};
const updateUserShoutoutsReceived = (state, shoutouts) => {
  state.user.shoutoutsReceived = shoutouts || [];
};
const updateUserSummary = (state, userId) => {
  const userIndex = state.users.findIndex((user) => user.id === userId);
  if (userIndex === -1) state.user.summary = {};
  else {
    state.user.summary = {
      total_shoutouts_given: state.users[userIndex].num_shoutouts_given,
      total_shoutouts_received: state.users[userIndex].num_shoutouts_received,
      most_company_value_given: state.users[userIndex].most_company_value_given,
      most_company_value_received:
        state.users[userIndex].most_company_value_received,
    };
  }
};
const updateCompanyValues = (state, values) => {
  state.companyValues = values || [];
};
const updateLoading = (state, { data, isLoading }) => {
  state.loading[data] = isLoading;
};

// direct store changes
export default {
  updateUsers,
  updateShoutouts,
  updateRecentShoutouts,
  updateRankedUsers,
  updateUserShoutoutsGiven,
  updateUserShoutoutsReceived,
  updateUserSummary,
  updateCompanyValues,
  updateLoading,
};
