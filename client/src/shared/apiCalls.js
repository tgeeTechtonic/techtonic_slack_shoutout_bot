import axios from 'axios';

export const getRecentShouts = async () => {
  const url = process.env.VUE_APP_URL;
  try {
    const response = await axios.get(url+ '/api/recents');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShouts = async () => {
  const url = process.env.VUE_APP_URL;
  try {
    const response = await axios.get(url + '/api/shoutouts');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRankedByMonth = async (type, month, year) => {
  const url = process.env.VUE_APP_URL;
  const urlQueries = `/api/reports/monthly?type=${type}&year=${year}&month=${month}`;
  try {
    const response = await axios.get(url+ urlQueries);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  const url = process.env.VUE_APP_URL;
  try {
    const response = await axios.get(url + '/api/all-users');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
