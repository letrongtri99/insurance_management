Feature: Test multiple actions on the lead Assignment page

    Feature Outline: Lead Assignment page
    Reference: QAA-211, QAA-241

    Lead-008: Assign lead to Sale Agent                                         ->        TC-001
    Lead-009: Unassign lead to Sale Agent                                       ->        TC_003
    Lead-010: Reassign leads to new Sale Agent without unassign                 ->        TC_002
    Lead-011: Open to see Lead Page on Lead Assignment menu successfully        ->        TC_001 - TC_003

    @new-data @navigate-to-lead-assignment
    Scenario: TC_001_LEAD-ASSIGNMENT - Assign a lead
        When I select the lead
        And I assign the lead to the specific employee
        And I search for the lead again
        Then expect the lead to be assigned to the specific employee


    Scenario: TC_002_LEAD-ASSIGNMENT - Reassign a lead
        When I select the lead
        And I get the lead ID
        And I assign the lead to the specific employee
        And I search for the lead again
        Then expect the lead to be assigned to the specific employee

    Scenario: TC_003_LEAD-ASSIGNMENT - Unassign a lead
        When I select the lead
        And I get the lead ID
        And I unassign the lead
        And I search for the lead again
        Then expect the lead to be unassigned
