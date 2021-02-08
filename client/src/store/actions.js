import {
  getRecentShouts,
  getAllShouts,
  getRankedByMonth,
  getAllUsers,
  getSingleUser,
  getShoutoutsByType,
  getAllCompanyValues,
  getEmployee,
} from '@/shared/apiCalls';

const getCompanyValues = async ({ commit }) => {
  commit('updateLoading', { data: 'companyValues', isLoading: true });
  try {
    const companyValues = await getAllCompanyValues();
    commit('updateCompanyValues', companyValues);
  } catch (e) {
    console.error;
  }
  commit('updateLoading', { data: 'companyValues', isLoading: false });
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

const getUser = async ({ commit }, { userId, startDate, endDate }) => {
  commit('updateLoading', { data: 'user', isLoading: true });
  try {
    const user = await getSingleUser(userId, startDate, endDate);
    const shoutoutsGiven = await getShoutoutsByType(
      userId,
      'shouter',
      startDate,
      endDate
    );
    const shoutoutsReceived = await getShoutoutsByType(
      userId,
      'shoutee',
      startDate,
      endDate
    );

    commit('updateUser', { ...user, shoutoutsGiven, shoutoutsReceived });
  } catch (e) {
    console.error;
  }
  commit('updateLoading', { data: 'user', isLoading: false });
};

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

const loginEmployee = async ({ commit }, employeeInfo) => {
  try {
    const employee = await getEmployee(employeeInfo);
    if (employee.data) commit('updateEmployee', employee.data);
    else
      commit(
        'updateLoginError',
        'Email or Password is incorrect, please try again'
      );
  } catch (e) {
    console.error;
  }
};

const logoutEmployee = async ({ commit }) => {
  commit('updateEmployee', {});
};

const resetError = ({ commit }) => {
  commit('updateLoginError', '');
};

const doLogin = ({ commit }, name) => {
  commit('hackEmp', name);
};


// async changes (api calls)
export default {
  getCompanyValues,
  getRankedUsersByMonth,
  getRecentShoutouts,
  getShouts,
  getUser,
  getUsers,
  loginEmployee,
  logoutEmployee,
  resetError,
  doLogin
};
