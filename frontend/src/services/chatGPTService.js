import axios from 'axios';
import { CONSTANTS } from '../constants';

// eslint-disable-next-line no-unused-vars
export const getTitleFromGPT = async (params) => {
    // eslint-disable-next-line no-unused-vars
  try {
    const response = await axios.post(CONSTANTS.CHATGPT.OPEN_API_URL, { /* data */ });
    return response.data;
  } catch (error) {
    console.error('Error fetching title from GPT', error);
  }
};

export const getJiraCreateMeta = async () => {
  // Function logic here
  try {
    const response = await axios.get(/* API URL */);
    return response.data;
  } catch (error) {
    console.error('Error in getJiraCreateMeta:', error);
    throw error;
  }
};

