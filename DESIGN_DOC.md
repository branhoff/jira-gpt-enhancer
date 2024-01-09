
The react front end was put together hastily during a hackathon. I would like to refactor and reorgnaize it into a more readabile vue project.
```
project_root/
│
├── src/
│   ├── assets/                  # Store static files like images
│   ├── components/              # Vue components
│   │   ├── ChatGPTForm.vue      # Main form component
│   │   └── ...                  # Other components
│   ├── services/                # API calls and services
│   │   ├── chatGPTService.js    # API calls related to ChatGPT
│   │   ├── jiraService.js       # API calls related to Jira
│   │   └── ...                  # Other services
│   ├── App.vue                  # Root component
│   ├── main.js                  # Entry point for the Vue app
│   └── ...
│
├── public/
│   └── index.html               # HTML entry point
│
├── package.json                 # Node.js dependencies
└── ...
```