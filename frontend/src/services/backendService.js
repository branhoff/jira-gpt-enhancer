import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const promptChatGPT = async (messageContent, model) => {
  try {
    const response = await axios.post(`${API_URL}/chat_gpt/prompt/`, {
      message_content: messageContent,
      model: model,
    });
    return response.data;
  } catch (error) {
    console.error('Error prompting ChatGPT:', error);
    throw error;
  }
};

