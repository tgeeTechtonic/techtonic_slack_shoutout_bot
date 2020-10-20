import axios from 'axios';
import { mockShoutData } from './shared/mockData';

export const getData = async (url) => {
  try {
    return await (await axios.get(url)).data;
  } catch (e) {
    console.log(e);
  }
};

export const mockGetData = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => resolve(mockShoutData), 1500);
  });
  // return await mockShoutData;
};
