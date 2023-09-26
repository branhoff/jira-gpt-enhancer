import requests
from requests.auth import HTTPBasicAuth
import json
from decouple import config
from typing import Union, Dict, Any

BASE_URL = "https://climate.jira.com/rest/api/2"
AUTH = HTTPBasicAuth("brandon.hoffman@climate.com", config('JIRA_API_KEY'))
HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

def request_jira(method: str, endpoint: str, data: Union[Dict, None] = None) -> Union[Dict[str, Any], Dict[str, str]]:
    """
    Send a request to the Jira API.

    Args:
        method (str): The HTTP method (e.g., "GET", "POST").
        endpoint (str): The API endpoint to request.
        data (Dict, optional): The data to send in the request. Defaults to None.

    Returns:
        Union[Dict[str, Any], Dict[str, str]]: Returns the JSON response from the API or an error dictionary.
    """
    try:
        response = requests.request(
            method,
            f"{BASE_URL}/{endpoint}",
            data=json.dumps(data) if data else None,
            headers=HEADERS,
            auth=AUTH
        )
        response.raise_for_status()  
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}

def create_jira_issue(summary: str, description: str, issue_type: str = "Bug") -> Dict:
    """
    Create a Jira issue.

    Args:
        summary (str): The summary of the Jira issue.
        description (str): The description of the Jira issue.
        issue_type (str, optional): The type of the Jira issue. Defaults to "Bug".

    Returns:
        Dict: Returns the JSON response from the Jira API.
    """
    payload = {
        "fields": {
            "project": {"key": "HELIOS"},
            "summary": summary,
            "description": description,
            "issuetype": {"name": issue_type}
        }
    }
    return request_jira("POST", "issue", payload)

def get_fields() -> str:
    """
    Get all fields from the Jira API.

    Returns:
        str: Returns a stringified JSON of all Jira fields.
    """
    response = request_jira("GET", "field")
    return json.dumps(response, sort_keys=True, indent=4, separators=(",", ": "))

def update_custom_field(field_id: str) -> Dict:
    """
    Update a custom field in Jira.

    Args:
        field_id (str): The ID of the custom field to update.

    Returns:
        Dict: Returns the JSON response from the Jira API.
    """
    payload = {
        "description": "Select the manager and the corresponding employee.",
        "name": "Managers and employees list",
        "searcherKey": "com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher"
    }
    return request_jira("PUT", f"field/{field_id}", payload)
