import axios from 'axios';

const baseUrl = process.env.VUE_APP_URL;

export const getRecentShouts = async () => {
  try {
    const response = await axios.get(baseUrl + '/api/recents');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShouts = async (startDate, endDate) => {
  const urlQueries = `/api/shoutouts?start-date=${startDate}&end-date=${endDate}`;
  try {
    const response = await axios.get(baseUrl + urlQueries);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRankedByMonth = async (type, month, year) => {
  const urlQueries = `/api/reports/monthly?type=${type}&year=${year}&month=${month}`;
  try {
    const response = await axios.get(baseUrl + urlQueries);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl + '/api/all-users');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserShoutoutsByType = async (
  userId,
  type,
  startDate,
  endDate
) => {
  const urlQueries = `/api/shoutouts/user/${userId}?type=${type}&start-date=${startDate}&end-date=${endDate}`;
  try {
    const response = await axios.get(baseUrl + urlQueries);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
