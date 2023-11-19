
# CREATE ISSUE
curl -X POST -H "Content-Type: application/json" \
    -d '{
        "fields": {
            "project": {
                "key": "SSEP"
            },
            "summary": "Hackathon AI DevOps Test",
            "description": "This is just a test ticket",
            "issuetype": {
                "name": "Story"
            },
            "customfield_19900": "Add unit tests if applicable. Add integration tests if applicable.",
            "customfield_24661": [{
                "id": "26751",
                "self": "https://climate.jira.com/rest/api/2/customFieldOption/26751",
                "value": "ART 5 - Messaging"
            }],
            "customfield_24472": 4
        }
    }' http://localhost:5000/api/jira/create-issue/


# GET ISSUE CREATEMETA DATA
# curl -v -X GET -H "Accept: application/json" 'http://localhost:5000/api/jira/issue/createmeta/?projectKeys=SSEP&issuetypeNames=Bug&expand=projects.issuetypes.fields'


curl 'http://localhost:5000/api/jira/create-issue/' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H 'Origin: http://localhost:3000' \
  -H 'Pragma: no-cache' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --data-raw '{"fields":{"summary":"Implement user authentication","description":"As a user, I want to be able to authenticate myself in order to access the application securely.","acceptanceCriteria":"1. User should be able to provide valid credentials\n2. The system should verify the credentials against the database\n3. If the credentials are valid, the user should be granted access to the application\n4. If the credentials are invalid, the user should be shown an error message","project":"SSEP","issuetype":"Story","customfield_19900":"1. User should be able to provide valid credentials\n2. The system should verify the credentials against the database\n3. If the credentials are valid, the user should be granted access to the application\n4. If the credentials are invalid, the user should be shown an error message","agileTeam":{"fieldName":"customfield_24661","label":"ART 5 - Messaging","id":"26751","self":"https://climate.jira.com/rest/api/2/customFieldOption/26751","value":"ART 5 - Messaging"},"customfield_24661":{"fieldName":"customfield_24661","label":"ART 5 - Messaging","id":"26751","self":"https://climate.jira.com/rest/api/2/customFieldOption/26751","value":"ART 5 - Messaging"}}}' \
  --compressed


