import requests
import json

from decouple import config

openai_api_key = config("OPENAI_API_KEY")

url = "https://api.openai.com/v1/chat/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
}

data = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Can you write a ticket for a  jira for a web game where you bounce a ball on a paddle and can you ouput in a json format"}],
    "temperature": 0.7
}

response = requests.post(url, headers=headers, data=json.dumps(data), verify=False)
response_json = response.json()

print(response_json)
