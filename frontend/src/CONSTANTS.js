export const CONSTANTS = {
    CHAGEGPT: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        OPEN_API_URL: 'https://api.openai.com/v1/chat/completions/',
    },
    JIRA: {
        API_URL: process.env.JIRA_API_URL,
        PROJECT_KEY: process.env.JIRA_PROJECT_KEY,
        AUTH_USERNAME: process.env.JIRA_AUTH_USERNAME
    }
}
