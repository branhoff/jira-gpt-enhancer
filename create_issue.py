import requests
from requests.auth import HTTPBasicAuth
import json

from decouple import config

url = "https://climate.jira.com/rest/api/2/issue"

auth = HTTPBasicAuth(
    "brandon.hoffman@climate.com", 
    f"{config('JIRA_API_KEY')}"
    )

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

payload = json.dumps({
    "fields": {
        "project": {
            "key": "HELIOS"
        },
        "summary": "Hackathon AI DevOps Test",
        "description": "This is just a test ticket",
        "issuetype": {
            "name": "Bug"
        }
    }
})


response = requests.request(
   "POST",
   url,
   data=payload,
   headers=headers,
   auth=auth,
   verify=False
)

print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))