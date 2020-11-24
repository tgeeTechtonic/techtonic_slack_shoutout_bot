export const state = {
  companyValues: [], // ARRAY OF COMPANY VALUES IN DATABASE
  rankedUsers: [], // ARRAY OF USERS RANKED BY SHOUTOUTS GIVEN / RECEIVED
  recentShoutouts: [], // ARRAY OF THE MOST RECENT SHOUTOUTS FROM DATABASE
  shoutouts: [], // ARRAY OF QUERIED SHOUTOUTS RETRIEVED FROM DATABASE
  users: [], // ARRAY OF ALL USERS IN DATABASE
  user: { // CURRENTLY SELECTED USER
    shoutoutsGiven: [], // ARRAY OF SPECIFIC USER SHOUTOUTS GIVEN
    shoutoutsReceived: [], // ARRAY OF SPECIFIC USER SHOUTOUTS RECEIVED
    summary: {}, // SUMMARY OF SPECIFIC USER SHOUTOUTS
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
