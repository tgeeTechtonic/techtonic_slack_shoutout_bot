import {
  adminFormatter,
  companyValuesFormatter,
  rankedShoutersFormatter,
  shoutoutFormatter,
  userFormatter,
} from '../shared/formatters';

const updateAdmin = (state, admin) => {
  state.admin = adminFormatter(admin);
};

const updateCompanyValues = (state, values) => {
  state.companyValues = companyValuesFormatter(values) || [];
};

const updateLoading = (state, { data, isLoading }) => {
  state.loading[data] = isLoading;
};

const updateLoginError = (state, error) => {
  state.loginError = error.length ? error : '';
};

const updateLoginView = (state) => {
  state.showLogin = !state.showLogin;
};

const updateRankedUsers = (state, ranked) => {
  state.rankedUsers = rankedShoutersFormatter(ranked) || [];
};

const updateRecentShoutouts = (state, recentShoutouts) => {
  state.recentShoutouts = recentShoutouts || [];
};

const updateShoutouts = (state, shoutouts) => {
  state.shoutouts = shoutouts.length ? shoutoutFormatter(shoutouts) : [];
};

const updateUser = (state, user) => {
  state.user = userFormatter(user) || {};
};

const updateUsers = (state, users) => {
  state.users = users || [];
};

// direct store changes
export default {
  updateAdmin,
  updateCompanyValues,
  updateLoading,
  updateLoginError,
  updateLoginView,
  updateRankedUsers,
  updateRecentShoutouts,
  updateShoutouts,
  updateUser,
  updateUsers,
};
