export const state = {
  companyValues: [], // ARRAY OF COMPANY VALUES IN DATABASE
  employee: {}, // DATA FOR EMPLOYEE CURRENTLY LOGGED IN
  loginError: '',
  rankedUsers: [], // ARRAY OF USERS RANKED BY SHOUTOUTS GIVEN / RECEIVED
  recentShoutouts: [], // ARRAY OF THE MOST RECENT SHOUTOUTS FROM DATABASE
  shoutouts: [], // ARRAY OF QUERIED SHOUTOUTS RETRIEVED FROM DATABASE
  users: [], // ARRAY OF ALL USERS IN DATABASE
  user: {
    // CURRENTLY SELECTED USER
    avatar: '',
    email: '',
    first_name: '',
    id: 0,
    job_title: '',
    last_name: '',
    most_company_value_given: '-',
    most_company_value_received: '-',
    role: '',
    shoutoutsGiven: [],
    shoutoutsReceived: [],
    slack_handle: '',
  },
  // LOADING STATUSES FOR EACH STATE PROP IN STORE
  loading: {
    companyValues: false,
    rankedUsers: false,
    recentShoutouts: false,
    shoutouts: false,
    users: false,
    user: false,
  },
};
