import requests
from requests.auth import HTTPBasicAuth
import json
from decouple import config
from typing import Union, Dict, Any, Optional

BASE_URL: str = "https://climate.jira.com/rest/api/2"
AUTH: HTTPBasicAuth = HTTPBasicAuth("brandon.hoffman@climate.com", config('JIRA_API_KEY'))
HEADERS: Dict[str, str] = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

def request_jira(method: str, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
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
        response: requests.Response = requests.request(
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


def create_jira_issue(**kwargs: Any) -> Dict[str, Any]:
    """
    Create a Jira issue.

    Args:
        **kwargs: The fields and their values to create a Jira issue.

    Returns:
        Dict: Returns the JSON response from the Jira API.
    """
    # Default structure for the Jira issue payload

    payload: Dict[str, Dict] = {
        "fields": {
            "project": kwargs.get('project', 'DEFAULT_PROJECT'),
            "summary": kwargs.get('summary', 'DEFAULT_SUMMARY'),
            "description": kwargs.get('description', 'DEFAULT_DESCRIPTION'),
            "issuetype": kwargs.get('issuetype', 'DEFAULT_ISSUETYPE'),
            "customfield_19900": kwargs.get('customfield_19900', 'DEFAULT_CUSTOMFIELD_19900'),
            "customfield_24661": kwargs.get('customfield_24661', [])
        }
    }

    return request_jira("POST", "issue", payload)


def get_fields() -> str:
    """
    Get all fields from the Jira API.

    Returns:
        str: Returns a stringified JSON of all Jira fields.
    """
    response: Dict[str, Any] = request_jira("GET", "field")
    return json.dumps(response, sort_keys=True, indent=4, separators=(",", ": "))


def update_custom_field(field_id: str) -> Dict[str, Any]:
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


def get_issue_createmeta( project_keys: str, issue_type_names: str, expand: Optional[str] = None) -> Dict[str, Any]:
    """
    Get the metadata required to create Jira issues.

    Returns:
        Dict: Returns the JSON response from the Jira API.
    """

    params: str = f"projectKeys={project_keys}&issuetypeNames={issue_type_names}"
    if expand:
        params += f"&expand={expand}"
    endpoint: str = f"issue/createmeta?{params}"

    return request_jira("GET", endpoint)
