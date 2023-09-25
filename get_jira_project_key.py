import requests
from requests.auth import HTTPBasicAuth
import json

from decouple import config

JIRA_BASE_URL = "https://climate.jira.com"
#31355
PROJECT_KEY = "HELIOS"
AUTH_USERNAME = "brandon.hoffman@climate.com"
AUTH_API_TOKEN = config("JIRA_API_KEY")

url = f"{JIRA_BASE_URL}/rest/api/latest/project/{PROJECT_KEY}"

auth = HTTPBasicAuth(AUTH_USERNAME, AUTH_API_TOKEN)

headers = {
    "Accept": "application/json"
}

response = requests.get(
    url,
    headers=headers,
    auth=auth,
    verify=False
)

if response.status_code == 200:
    project_info = response.json()
    print(f"Project Key: {project_info.get('key')}")
    print(f"Project Name: {project_info.get('name')}")
else:
    print(f"Failed to get project info. HTTP Status Code: {response.status_code}")
    print(f"Response: {response.text}")
