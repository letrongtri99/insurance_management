Feature: Test multiple actions on the lead rejection page

    Feature Outline: Lead rejection page
    Reference: QAA-214

    Lead-033: User can open Lead Page successfully on Rejection Lead            ->        TC-001 - TC-002
    Lead-034: User can do Decline at lead successfully                          ->        TC_001
    Lead-035: User can approve Rejected  lead successfully                      ->        TC_002

    Background: Visit the lead rejection page
        Given I am on the lead rejection page

    Scenario: TC_001_LEAD-REJECTION - Decline rejected lead
        When I select the first rejected lead
        And I click the button 'Decline'
        And I click the button 'Confirm'
        Then expect the lead to be rejected
        When I navigate to the all leads page
        And I search for the lead
        Then expect the status to be 'green'

    Scenario: TC_002_LEAD-REJECTION - Approve rejected lead
        When I select the first rejected lead
        And I click the button 'Approve'
        And I click the button 'Confirm'
        Then expect the lead to be rejected
        When I navigate to the all leads page
        And I search for the lead
        Then expect the status to be 'grey'
