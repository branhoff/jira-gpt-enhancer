import {CONSTANTS} from './CONSTANTS';

export const postToChatGPT = (params) => {
    const {summary, description, acceptanceCriteria} = params;

    const data = {
        'model': 'gpt-3.5-turbo',
        'messages': [{
            'role': 'user',
            'content': `Can you create a random jira ticket containing summary, 
            description and acceptanceCriteria?  
            Reply with only valid json, 
            must contain only description, summary and single acceptanceCriteria`
        }],
        'temperature': 0.7
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONSTANTS.CHAGEGPT.OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
    };

    console.log('%c...options', 'color:gold', options);
    return fetch('https://api.openai.com/v1/chat/completions', options)
        .then(resp => resp.json());
};
export const getTitleFromGPT = (params) => {
    const {description, acceptanceCriteria} = params;
    const data = {
        'model': 'gpt-3.5-turbo',
        'messages': [{
            'role': 'user',
            'content': `Can you fill in the summary and create a jira ticket using description: ${params.description}, acceptanceCriteria: ${params.acceptanceCriteria}.  
            Reply with only valid json without nesting, must contain only description, summary and single acceptanceCriteria. 
            If description or acceptanceCriteria are empty, set them to an empty string instead of undefined.`
        }],
        'temperature': 0.7
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONSTANTS.CHAGEGPT.OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
    };

    console.log('%c...options', 'color:gold', options);
    return fetch('https://api.openai.com/v1/chat/completions', options)
        .then(resp => resp.json());
};

export const getDescriptionFromGPT = (params) => {
    const {summary, acceptanceCriteria} = params;
    const data = {
        'model': 'gpt-3.5-turbo',
        'messages': [{
            'role': 'user',
            'content': `Can you fill in the description and create a jira ticket using summary: ${params.summary} and acceptanceCriteria: ${params.acceptanceCriteria}.  Reply with only valid json without nesting, must contain only description, summary and single acceptanceCriteria. If summary or acceptanceCriteria are empty, set them to an empty string instead of undefined.`
        }],
        'temperature': 0.7
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONSTANTS.CHAGEGPT.OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
    };

    console.log('%c...options', 'color:gold', options);
    return fetch('https://api.openai.com/v1/chat/completions', options)
        .then(resp => resp.json());
};

export const getACFromGPT = (params) => {
    const {summary, acceptanceCriteria} = params;
    const data = {
        'model': 'gpt-3.5-turbo',
        'messages': [{
            'role': 'user',
            'content': `Can you fill in the acceptance criteria and create a jira ticket using summary: ${params.summary} and description: ${params.description}.  Reply with only valid json without nesting, must contain only description, summary and single acceptanceCriteria. If summary or description are empty, set them to an empty string instead of undefined.`
        }],
        'temperature': 0.7
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONSTANTS.CHAGEGPT.OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
    };

    console.log('%c...options', 'color:gold', options);
    return fetch('https://api.openai.com/v1/chat/completions', options)
        .then(resp => resp.json());
};
export const postToCreateJiraIssue = data => {
    const JIRA_URL = `${CONSTANTS.JIRA.API_URL}api/jira/create-issue/`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(JIRA_URL, options)
        .then(resp => resp.json());

};

export const getJiraFields = props => {
    const JIRA_URL = `${CONSTANTS.JIRA.API_URL}/api/jira/fields/`;
    const options = {method: 'GET',};
    console.log('%c...headers', 'color:gold', options);
    return fetch(JIRA_URL, options)
        .then(resp => resp.json());
}

export const getJiraCreateMeta = props => {
    const JIRA_URL = `${CONSTANTS.JIRA.API_URL}/api/jira/issue/createmeta/`;
    const options = {method: 'GET',};
    console.log('%c...headers', 'color:gold', options);
    return fetch(JIRA_URL, options)
        .then(resp => resp.json());

}


export const buildAgileTeamsList = (data) => {
    const agileTeamList = Object.entries(data.projects[0].issuetypes[0].fields)
        .filter(([key, val]) => (val.name === 'Agile Team'))
        .map((list) => ({fieldName: list[0], teams: [...list[1].allowedValues]}))
        .map(item => {
            return item.teams.map(team => {
                return {
                    fieldName: item.fieldName,
                    label: team.value,
                    ...team
                }
            })
        })[0]

    return agileTeamList
}


export const buildPostBodyForNewJiraIssue = (formData) => {
    return {
        fields: {
            summary:formData.summary,
            description:formData.description,
            project: {key: formData.project},
            issuetype:{name:formData.issuetype},
            customfield_19900: formData.acceptanceCriteria,
            customfield_24661: [formData.agileTeam]
        }
    }

}
