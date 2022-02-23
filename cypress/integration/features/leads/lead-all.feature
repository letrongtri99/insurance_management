Feature: Test multiple actions on the lead all page

    Feature Outline: Lead All page
    Reference: QAA-209, QAA-210

    Lead-003: Lead All function display correct lead data                                   ->          TC-001 - TC-008
    Lead-004: User can open to see Lead Page successfully                                   ->          TC-xxx
    Lead-005: User can sort and filter search by Customer Name                              ->          TC-009
    Lead-006: User can sort and filter search by Customer Email as fullname or some word    ->          TC-010
    Lead-007: User can sort and filter search by ID                                         ->          TC-011

    @new-data @navigate-to-lead-all
    Scenario: TC_001_LEAD-ALL - Lead All display lead status New as user filter
        When I filter lead status 'New'
        And I click the button 'Search'
        Then expect the filtered column 'lead status' would have result of 'New'

    Scenario Outline: TC_002_LEAD-ALL - TC_008_LEAD_ALL - Lead All display lead status <actual> as user filter <expected>
        When I reload the page
        And I filter lead status "<actual>"
        And I click the button 'Search'
        Then expect the filtered column 'lead status' would have result of "<expected>"
        Examples:
            | actual          | expected        |
            | Valid           | Valid           |
            | Contacted       | Contacted       |
            | Interested      | Interested      |
            | Prospect        | Prospect        |
            | Pending Payment | Pending Payment |
            | Purchase        | Purchase        |
            | Cancelled       | Cancelled       |

    Scenario: TC_009_LEAD-ALL - User can sort and filter search by Customer Name
        When I reload the page
        And I filter search by 'Customer Name' with value 'Auto_Test'
        And I click the button 'Search'
        Then expect the filtered column 'name' would have result of 'Auto_Test Cypress'

    Scenario: TC_010_LEAD-ALL - User can sort and filter search by Email
        When I reload the page
        And I filter search by 'Customer Email' with value 'Cypress@gmail.co.th'
        And I click the button 'Search'
        Then expect the filtered column 'email' would have result of 'Cypress@gmail'

    Scenario: TC_011_LEAD-ALL - User can sort and filter search by ID
        When I reload the page
        And I filter search by 'ID' with value 'L133508'
        And I click the button 'Search'
        Then expect the filtered column 'id' would have result of 'L133508'

    Scenario: TC_012_LEAD-ALL - User can open to see Lead Page successfully
        When I reload the page
        And I filter search by 'ID' with value 'L133508'
        And I click the button 'Search'
        And I click see the details
        Then expect all the details of lead correctly
