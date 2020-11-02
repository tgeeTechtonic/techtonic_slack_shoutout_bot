import axios from "axios";

export const getRecentShouts = async () => {
  const url = "http://localhost:8081/api/recents";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShouts = async () => {
  const url = "http://localhost:8081/api/shoutouts";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRankedByMonth = async (type, month, year) => {
  const url = `http://localhost:8081/api/reports/monthly?type=${type}&year=${year}&month=${month}`;
  console.log('url', url)
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}