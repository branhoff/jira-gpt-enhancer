

# Setup
- Create a venv and install the packages in requirements.txt
- Create `.env` file and populate it with API keys:
    - OPENAI_API_KEY
    - JIRA_API_KEY

# Minimum Viable Product
- Set up a frontend framework
- Develop the UI components
- Implement form fields for Jira issue creation
- Create an interface or a button to trigger the ChatGPT call
- Handle the responses from the backend and auto-fill the form
- Set up routes
- Get initial acceptable prompts from security team (Jag)
- Fine tune ChatGPT prompts

# Possible Enhancements
- Issue Prioritization:
    - Use ChatGPT to analyze the content of the issue and suggest a priority level based on keywords or the nature of the issue.
- ChatGPT-Assisted Issue Descriptions:
    - Instead of just filling fields, users can interactively describe their issue to ChatGPT and get a more refined and detailed description for the Jira issue.
- Feedback Loop for AI Improvement:
    - After ChatGPT suggests content for an issue, allow users to provide feedback on the suggestion's accuracy. This feedback can be used to improve the model's responses over time.
- Chatbot Interface:
    - Instead of a traditional form, implement a chatbot interface where users converse with ChatGPT to create their issue.

# Resources
- [Jira Agile Server REST API reference](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-group-issues)
- [Jira Rest API examples](https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/)
- [GitLab REST API reference](https://docs.gitlab.com/ee/api/rest/)
- [OpenAI API](https://openai.com/product#made-for-developers)
- [Coursera: Prompt Engineering for ChatGPT](https://www.coursera.org/programs/crop-science-climate-engineering-team-xk3yn/learn/prompt-engineering?authProvider=bayer)
- [ChatGPT plugin for Jira](https://marketplace.atlassian.com/apps/1230857/chatgpt-plugin-for-jira?tab=overview&hosting=cloud#:~:text=Seamlessly%20create%20and%20manage%20Jira,workflow%20and%20enhance%20your%20productivity.)
- [OpenAi API reference](https://platform.openai.com/docs/api-reference/introduction)