Feature: Test multiple actions on the teams page

    Feature Outline: User Management Teams Page
    Reference: QAA-216

    Lead-036: Admin can create new team successfully                                   ->        TC-001

    Background: Navigate to the users page
        Given I am on the teams page

    Scenario: TC_001_ADMIN_TEAMS - Manual add team
        When I click the button 'Create Team'
        Then expect the form to be visible
        And I fill in the team form correctly
        Then expect the team to be created