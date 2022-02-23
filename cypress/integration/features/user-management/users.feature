Feature: Test multiple actions on the users page

    Feature Outline: User Management Users Page
    Reference: QAA-215

    Lead-037: Admin can create new user successfully                                   ->        TC-001
    Lead-038: Admin can import user successfully                                       ->        TC_002
    QAA-330: Download user name
    QAA-331: Create new users
    QAA-332: Update new users
    QAA-345: Search new users

    Background: Navigate to the users page
        Given I am on the users page

    Scenario Outline: TC_001 - TC010_USERS_ROLE - Create a User: <Roles> and Update it into: <UpdateRoles>
        When I click the button 'Add User'
        Then expect the form to be visible
        When I fill the form for adding a user with the role "<Roles>" correctly
        And I click the button 'Create'
        Then expect "<Roles>" user to be created
        When I click the icon 'Update' from the user created
        Then expect the form to be visible with the "<Roles>" user data filled
        When I fill the form for updating a user with the role "<UpdateRoles>"
        And I click the button 'Update'
        Then expect "<UpdateRoles>" user to be updated
        Examples:
            | Roles                      | UpdateRoles                |
            | Admin                      | Problem Case Agent         |
            | Manager                    | Submission Agent           |
            | Supervisor                 | Quality Control Agent      |
            | Sales agent                | Documents Collection Agent |
            | Inbound agent              | Customer Service Agent     |
            | Customer Service Agent     | Inbound agent              |
            | Documents Collection Agent | Sales agent                |
            | Quality Control Agent      | Supervisor                 |
            | Submission Agent           | Manager                    |
            | Problem Case Agent         | Admin                      |

    Scenario: TC_011_ADMIN_USER - Upload user csv file
        When I get the first 3 existing leads email addresses
        And I click the button 'Import User'
        Then expect the form to be visible
        When I submit the csv file
        Then expect the first 3 users to be updated

    Scenario: TC_012_DOWNLOAD_USER_FILE - Download file of existing users
        When I click the button 'Template'
        Then expect the User file to be downloaded

    Scenario: TC_013_SEARCH_USER - Search User on List page
        When I click on 'humanId' dropdown
        Then expect to get all Users Names
        When I click on '129324595@gmail.com' item in the position: '1'
        Then 'Search' button will be enabled
        When I click the button 'Search'
        Then expect '129324595@gmail.com' to be displayed on List page

    Scenario: TC_014_SEARCH_USER_NAME - Search User by Name on List page
        When Input 'CypressUpd TestUpd' on 'userFullName' field
        Then 'Search' button will be enabled
        When I click the button 'Search'
        Then expect 'CypressUpd TestUpd' to be displayed on List page

    Scenario: TC_015_SEARCH_AGENT_SCORE - Search Agent Score on List page
        When I click on 'annotations' dropdown
        Then expect to get 'Agent scores' values
        When I click on '2' item in the position: '1'
        Then 'Search' button will be enabled
        When I click the button 'Search'
        Then expect '2' to be displayed on List page

    Scenario: TC_016_SEARCH_DATE_TYPE - Search User by Creation Date from last Month on List page
        When I click on date type dropdown
        Then expect to get 'Date Type' values
        When I click on 'Created on' item
        Then 'Search' button will be enabled
        When I click on 'date' dropdown
        And I click the button 'Last month'
        And I click the button 'Search'
        Then expect 'Created on Last Month' to be displayed on List page

    Scenario: TC_017_SEARCH_PRODUCT - Search Product on List page
        When I click on 'teamProduct' dropdown
        Then expect to get 'Product' values
        When I click on 'Car Insurance' item in the position: '0'
        Then 'Search' button will be enabled
        When I click the button 'Search'
        Then expect 'Car Insurance' to be displayed on List page

    Scenario: TC_018_SEARCH_ROLE - Search User by Role on List page
        When I click on 'role' dropdown
        Then expect to get 'Roles' values
        When I click on 'Supervisor' item in the position: '2'
        Then 'Search' button will be enabled
        When I click the button 'Search'
        Then expect 'Supervisor' to be displayed on List page

    Scenario: TC_019_SEARCH_STATUS - Search User by Status on List page
        When I click on 'status' dropdown
        Then expect to get 'Status' values
        When I click on 'Suspended' item in the position: '1'
        Then 'Search' button will be enabled
        When I click the button 'Search'
        Then expect 'Suspended' to be displayed on List page

    Scenario: TC_020_SEARCH_CREATED_BY - Search User by Created By on List page
        When I click on 'createBy' dropdown
        Then expect to get 'CreateBy' values
        When I click on 'Odertest Account' item in the position: '13'
        Then 'Search' button will be enabled
        When I click the button 'Search'
        Then expect 'Odertest Account' to be displayed on List page
