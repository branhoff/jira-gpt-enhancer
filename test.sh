
# CREATE ISSUE
# curl -X POST -H "Content-Type: application/json" \
#     -d '{
#         "fields": {
#             "project": {
#                 "key": "SSEP"
#             },
#             "summary": "Hackathon AI DevOps Test",
#             "description": "This is just a test ticket",
#             "issuetype": {
#                 "name": "Story"
#             },
#             "customfield_19900": "Add unit tests if applicable. Add integration tests if applicable.",
#             "customfield_24661": [{
#                 "id": "26751",
#                 "self": "https://climate.jira.com/rest/api/2/customFieldOption/26751",
#                 "value": "ART 5 - Messaging"
#             }]
#         }
#     }' http://127.0.0.1:5000/api/jira/create_issue/


# GET ISSUE CREATEMETA DATA
curl -v -X GET -H "Accept: application/json" 'http://localhost:5000/api/jira/issue/createmeta/?projectKeys=SSEP&issuetypeNames=Bug&expand=projects.issuetypes.fields'





