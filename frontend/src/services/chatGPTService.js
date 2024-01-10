import axios from 'axios';
import { CONSTANTS } from '../constants';

export const getTitleFromGPT = async (params) => {
  try {
    const response = await axios.post(CONSTANTS.CHATGPT.OPEN_API_URL, { /* data */ });
    return response.data;
  } catch (error) {
    console.error('Error fetching title from GPT', error);
  }
};

// Other API call methods
