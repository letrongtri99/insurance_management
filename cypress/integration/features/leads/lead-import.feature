Feature: Test multiple actions on the lead import page

    Feature Outline: Lead Import page
    Reference: QAA-211, QAA-241

    Lead-001: Add manual lead to Lead management                                ->        TC-001
    Lead-002: Import csv file                                                   ->        TC_002

    Background: Navigate to import page
        Given I am on the import page

    Scenario: TC_001_LEAD-IMPORT - Add manual lead
        When I click the button 'Add lead'
        And I fill in the add manual lead form correctly
        And I click the button 'Add Lead'
        And I search for the imported lead
        Then expect the lead is added

# Commented out because of LEAD-882
# Scenario: TC_002_LEAD-IMPORT - Import csv file
#     When I click the button 'Import lead'
#     And I drop the csv file and fill in the form
#     And I click the button 'Confirm Import'
#     Then expect the leads are added

