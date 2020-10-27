import axios from 'axios';

export const getRecentShouts = async () => {
  const url = 'http://localhost:8081/api/recents';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}