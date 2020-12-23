import {
  companyValuesFormatter,
  employeeFormatter,
  rankedShoutersFormatter,
  shoutoutFormatter,
  userFormatter,
} from '../shared/formatters';

const updateCompanyValues = (state, values) => {
  state.companyValues = companyValuesFormatter(values) || [];
};

const updateEmployee = (state, employee) => {
  state.employee = employeeFormatter(employee);
};

const updateLoading = (state, { data, isLoading }) => {
  state.loading[data] = isLoading;
};

const updateLoginError = (state, error) => {
  state.loginError = error.length ? error : '';
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
  updateCompanyValues,
  updateEmployee,
  updateLoading,
  updateLoginError,
  updateRankedUsers,
  updateRecentShoutouts,
  updateShoutouts,
  updateUser,
  updateUsers,
};
