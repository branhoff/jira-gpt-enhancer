from flask import Blueprint, request, jsonify
from typing import Dict, Any
from app.services import jira_service

jira_bp = Blueprint('jira_routes', __name__)

@jira_bp.route('/api/jira/create_issue/', methods=['POST'])
def create_jira_issue_route() -> Dict[str, Any]:
    """
    Create a new Jira issue.

    Returns:
        Dict[str, Any]: Returns the JSON response from the Jira API after creating the issue.
    """
    data = request.json
    summary = data.get('summary')
    description = data.get('description')
    issue_type = data.get('issue_type', 'Bug')

    response = jira_service.create_jira_issue(summary, description, issue_type)
    return jsonify(response)


@jira_bp.route('/api/jira/fields/', methods=['GET'])
def get_jira_fields() -> Dict[str, Any]:
    """
    Fetch all Jira fields.

    Returns:
        Dict[str, Any]: Returns the JSON response containing Jira fields.
    """
    response = jira_service.get_fields()
    return jsonify(response)


@jira_bp.route('/api/jira/fields/<field_id>/', methods=['PUT'])
def update_jira_field(field_id: str) -> Dict[str, Any]:
    """
    Update a custom Jira field by its ID.

    Args:
        field_id (str): ID of the field to be updated.

    Returns:
        Dict[str, Any]: Returns the JSON response from the Jira API after updating the field.
    """
    # Assuming that the payload for updating is in the request's JSON body.
    data = request.json
    response = jira_service.update_custom_field(field_id, **data)
    return jsonify(response)

