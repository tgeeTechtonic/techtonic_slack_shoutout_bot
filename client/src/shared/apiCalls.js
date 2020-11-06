import axios from 'axios';

export const getRecentShouts = async () => {
  try {
    const response = await axios.get('/api/recents');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShouts = async () => {
  try {
    const response = await axios.get('/api/shoutouts');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRankedByMonth = async (type, month, year) => {
  const url = `/api/reports/monthly?type=${type}&year=${year}&month=${month}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get('/api/all-users');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
