import axios from 'axios';

const url = process.env.VUE_APP_URL;

export const getRecentShouts = async () => {
  try {
    const response = await axios.get(url + '/api/recents');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShouts = async () => {
  try {
    const response = await axios.get(url + '/api/shoutouts');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRankedByMonth = async (type, month, year) => {
  const urlQueries = `/api/reports/monthly?type=${type}&year=${year}&month=${month}`;
  try {
    const response = await axios.get(url + urlQueries);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(url + '/api/all-users');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
