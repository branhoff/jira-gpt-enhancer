import {useEffect, useState} from "react";
import {
    buildAgileTeamsList,
    buildPostBodyForNewJiraIssue,
    getACFromGPT,
    getDescriptionFromGPT,
    getJiraCreateMeta,
    getTitleFromGPT,
    postToChatGPT,
    postToCreateJiraIssue
} from "./utils";
import React from 'react'
import Select from 'react-select'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {CONSTANTS} from "./CONSTANTS";


export const ChatGPTForm = props => {
    console.log(localStorage)
    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]
    const [agileTeam, setAgileTeam] = useState([])
    const issueTypes = [
        {value: 'Story', label: 'Story'},
        {value: 'Bug', label: 'Bug'},
        {value: 'Task', label: 'Task'}
    ]
    const [gptResp, setGptResp] = useState({});
    const [jiraFields, setJiraFields] = useState({
        summary: '',
        description: '',
        acceptanceCriteria: '',
        backgroundInfo:'',
        project: CONSTANTS.JIRA.PROJECT_KEY,
        issuetype: issueTypes[0].value,
        customfield_19900: 'AC',
        agileTeam: 'Team',
    });
    const [jiraIssueLink, setJiraIssueLink] = useState('');
    const [modal, setModal] = useState(false);

    const getTestData = () => {
        const params = {
            summary: jiraFields.summary,
            description: jiraFields.description,
            acceptanceCriteria: jiraFields.acceptanceCriteria,
        };

        postToChatGPT(params)
            .then(data => {
                const message = JSON.parse(data.choices.map(choice => choice.message.content));
                setGptResp(message);
            });
    };
    const getTitle = () => {
        const params = {
            description: jiraFields.description,
            acceptanceCriteria: jiraFields.acceptanceCriteria,
            backgroundInfo:jiraFields.backgroundInfo
        };

        getTitleFromGPT(params)
            .then(data => {
                console.log('%c...data', 'color:gold', data.choices);
                const message = JSON.parse(data.choices.map(choice => choice.message.content));
                console.log('%c...message', 'color:gold', message);
                setGptResp(message);
            });

    };

    const getDescription = () => {
        const params = {
            summary: jiraFields.summary,
            acceptanceCriteria: jiraFields.acceptanceCriteria
        };

        getDescriptionFromGPT(params)
            .then(data => {
                console.log('%c...data', 'color:gold', data.choices);
                const message = JSON.parse(data.choices.map(choice => choice.message.content));
                console.log('%c...message', 'color:gold', message);
                setGptResp(message);
            });
    };
    const getAC = () => {
        const params = {
            summary: jiraFields.summary,
            description: jiraFields.description
        };

        getACFromGPT(params)
            .then(data => {
                console.log('%c...data', 'color:gold', data.choices);
                const message = JSON.parse(data.choices.map(choice => choice.message.content));
                console.log('%c...message', 'color:gold', message);
                setGptResp(message);
            });
    };

    const createJiraIssue = () => {
        const postBody = buildPostBodyForNewJiraIssue(jiraFields)
        postToCreateJiraIssue(postBody).then(data => {
            console.log('%c...jira-data', 'color:gold', data);
            setJiraIssueLink(`https://climate.jira.com/browse/${data.key}`)
            toggleModal();
        });
    };
    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    useEffect(() => {
        getJiraCreateMeta().then(data => {
            const teamList = buildAgileTeamsList(data)
            setAgileTeam(teamList)
            setJiraFields({...jiraFields, agileTeam: teamList.find(item => item.label === 'ART 5 - Messaging'),})
        })
    }, []);

    useEffect(() => {
        console.log('%c...gpt-resp-effecgt', 'color:gold', gptResp)
        setJiraFields({
            ...jiraFields,
            ...gptResp
        });
    }, [gptResp]);

    return (
        <div id={'ChatGptForm'} className={'create'}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <label>Title</label>
            <div className={'container'}>
                    <textarea key={jiraFields.summary}
                              style={{marginRight: '10px'}} type={'text'}
                              name={'title'}
                              defaultValue={jiraFields.summary}
                              onChange={event => {
                                  jiraFields.summary = event.target.value;
                              }}
                    />
                <button style={{position:'absolute', right:'605px'}} onClick={() => getTitle()}> Generate Title </button>
                <img style={{width:'30px',height:'30px', position:'absolute',marginLeft:'430px',borderRadius:'5px'}} src={require('./chatgptlogo.jpeg')}/>

            </div>
            <label>Description</label>
            <div className={'container'}>
                    <textarea key={jiraFields.description}
                              style={{marginRight: '10px'}} type={'textarea'}
                              name={'description'}
                              defaultValue={jiraFields.description}
                              onChange={event => {
                                  jiraFields.description = event.target.value;
                              }}
                    />
                <button style={{position:'absolute', right:'565px'}} onClick={() => getDescription()}>Generate Description</button>
                <img style={{width:'30px',height:'30px', position:'absolute',marginLeft:'430px',borderRadius:'5px'}} src={require('./chatgptlogo.jpeg')}/>

            </div>

            <label>Acceptance Criteria</label>
            <div className={'container'}>
                    <textarea key={jiraFields.acceptanceCriteria}
                              style={{marginRight: '10px'}} type={'textarea'}
                              defaultValue={jiraFields.acceptanceCriteria}
                              name={'acceptance criteria'}
                              onChange={event => {
                                  jiraFields.acceptanceCriteria = event.target.value;
                              }}
                    />
                <button style={{position:'absolute', right:'515px'}}onClick={() => getAC()}>Generate Acceptance Criteria</button>
                <img style={{width:'30px',height:'30px', position:'absolute',marginLeft:'430px',borderRadius:'5px'}} src={require('./chatgptlogo.jpeg')}/>

            </div>
            <div style={{width: '400px'}}>
                <label>Jira Board</label>
                <Select placeholder={<div>User</div>} defaultValue={{value: 'SSEP', label: 'SSEP'}}/><br/>
                <label>Agile Team</label>
                <Select placeholder={<div>Agile Team</div>}
                        value={agileTeam.find(item => item.label === 'ART 5 - Messaging')}
                        options={agileTeam}/><br/>
                <label>Issue Type</label>
                <Select placeholder={<div>Issue Type</div>}
                        defaultValue={issueTypes[0]}
                        onChange={(issue) => jiraFields.issuetype = issue.value}
                        options={issueTypes}/><br/>
                <label>User</label>
                <Select placeholder={<div>User</div>} defaultValue={{value: 'Anuhya Alluri', label: 'Anuhya Alluri'}}/><br/>
            </div>

            <div className={'buttons'}>
                <>
                </>
                <img id={'Button2'}
                     key={'Button2'}
                     src={require('./Jira.png')}
                     onClick={() => createJiraIssue()}
                     style={{background: '#CC6634', position:'absolute',right:'920px'}} alt={'Jira'}/>
                <button style={{background:'#f36401', position:'absolute',right:'900px', height:'40px', borderRadius:'12px'}} onClick={() => createJiraIssue()}>Create Issue</button>
                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <br/>
                            <br/>
                            <h2> New Jira Ticket Created!</h2>
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <button style={{position: 'absolute',left:'130px', top:'130px', background:'transparent', border: '1px solid #cc6634', color: '#cc6634', height:'40px', width:'100px',  fontSize:'15px'}} onClick={(event) => {
                                window.open(jiraIssueLink, '_blank')
                            }}>VIEW</button>
                            <button style={{position: 'absolute',right:'20px', top:'10px', background:'transparent', border: '1px solid black', color:'black', height:'30px', width:'40px'}} onClick={() => toggleModal()}>X</button>
                        </div>
                    </div>
                )}
            </div>


        </div>

    );
};
