export const CONSTANTS = {
    CHATGPT: {
      OPENAI_API_KEY: process.env.VUE_APP_OPENAI_API_KEY,
      OPEN_API_URL: 'https://api.openai.com/v1/chat/completions/',
    },
    JIRA: {
      API_URL: process.env.VUE_APP_JIRA_API_URL,
      PROJECT_KEY: process.env.VUE_APP_JIRA_PROJECT_KEY,
      AUTH_USERNAME: process.env.VUE_APP_JIRA_AUTH_USERNAME
    }
  };
