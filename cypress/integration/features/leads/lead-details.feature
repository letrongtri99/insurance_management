Feature: Test multiple actions on the lead detail page

    Feature Outline: Lead Detail page
    Reference: QAA-215, QAA-240, QAA-212, QAA-278, QAA-280

    Lead-013: User can create reject lead' successfully                     ->        TC-018
    Lead-014: User can change car' successfully                             ->        need manual integration testing
    Lead-015: User can view quote successfully                              ->        need manual integration testing
    Lead-016: User can view purchase' successfully                          ->        need manual integration testing
    Lead-017: User add phone number successfully                            ->        TC-015
    Lead-018: User add email successfully                                   ->        TC-013
    Lead-010: User can add address - Bill Address successfully              ->        TC_010
    Lead-021: User can add address - Policy Address successfully            ->        TC_010
    Lead-022: User can add address - Shipping Address successfully          ->        TC_010
    Lead-023: User can select preferred insurer successfully                ->        TC_012
    Lead-024: User can add/remove Preferred v. Type successfully            ->        TC_011
    Lead-025: User can add preferred sum insured successfully               ->        TC_008
    Lead-026: User can create custom quote' success                         ->        TC-017
    Lead-028: User can apply to add pay slip' to lead success               ->        TC-022
    Lead-029: User can send SMS to customer's Phone number success          ->        TC-016
    Lead-020: User can send Email to customer success                       ->        TC-014
    Lead-031: User update status of Lead success                            ->        TC_001 - TC_007
    Lead-032: User add a comment on lead success                            ->        TC_009
    Lead-012: User can mark important lead successfully                     ->        TC_019
    Lead-019: User can make appointments successfully                       ->        TC_020
    Lead-027: User can apply a coupon to lead success                       ->        TC_021

    @new-data @navigate-to-lead-details
    Scenario: TC_001_LEAD-DETAILS - Update status 'Valid'
        When I click the button 'Change Status'
        And I fill the field 'comment' with 'Update status'
        And I change the status to 'Valid' and submit the form
        Then expect the status should update to 'Valid'

    Scenario Outline: TC_002 - TC007_LEAD-DETAILS - Update status into: <status>
        When I click the button 'Change Status'
        And I fill the field 'comment' with 'Update status'
        And I change the status to "<status>" and submit the form
        Then expect the status should update to "<status>"
        Examples:
            | status          |
            | Contacted       |
            | Interested      |
            | Prospect        |
            | Pending Payment |
            | New             |

    Scenario: TC_008_LEAD-DETAILS - Adjust sum insured
        When I insert a sum insured of '56000000'
        Then expect the sum insured must be '56,000,000'

    Scenario: TC_009_LEAD-DETAILS - Add comment
        When I type a comment 'This is a comment'
        Then expect the comment should have the text 'This is a comment'

    Scenario: TC_010_LEAD-DETAILS - Add adresses
        When I click the button 'Address'
        And I fill in the address form correctly
        And I click the button 'Add' within the form
        Then expect the address form is successfully submitted with the correct values

    Scenario: TC_0011_LEAD-DETAILS - Add preferred type
        When I select a preferred type
        Then expect the preferred type should be submitted succesfully

    Scenario: TC_012_LEAD-DETAILS - Add preferred insurer
        When I select preferred insurer 'Muang Thai Insurance'
        Then expect the preferred insurer should be 'Muang Thai Insurance Public Company Limited'

    Scenario: TC_013_LEAD-DETAILS - Add email
        When I click the button 'Email'
        And I type 'cypress@testemail.com' and submit the email form
        When I reload the page
        And I click the button 'Message'
        And I click the button 'COMPOSE'
        Then expect the email 'cypress@testemail.com' as a select option

    Scenario: TC_014_LEAD-DETAILS - Send an email
        When I click the button 'Message'
        And I click the button 'COMPOSE'
        And I sent an email
        Then expect the email to be sent

    Scenario: TC_015_LEAD-DETAILS - Add phonenumber
        When I click the button 'Phone'
        And I type '0999999999' and submit the phone form
        Then expect the phone number is added and have value '099999****'
        When I reload the page
        And I click the button 'Message'
        And I click the button 'COMPOSE'
        And I select the 'SMS' option
        Then expect the phonenumber '099999****' as a select option

    Scenario: TC_016_LEAD-DETAILS - Send an SMS
        When I click the button 'Message'
        And I click the button 'COMPOSE'
        And I select the 'SMS' option
        And I select a phonenumber and type 'This is test sms'
        And I click the button 'Send'
        Then expect the SMS to be sent with text 'This is test sms'

    @post
    Scenario: TC_017_LEAD-DETAILS - Add custom quote
        When I click the button 'CREATE CUSTOM QUOTE'
        And I fill in the custom quote form correctly
        And I click the button 'Save & Send Package'
        And I click the button 'Back'
        Then expect the post response 'customQuote' have the following values
            | statusCode  | 201          |
            | body.name   | Cypress test |
            | body.source | manual       |

    Scenario: TC_018_LEAD-DETAILS - Reject lead
        Then expect the status color should be 'green'
        When I click the button 'Change Status'
        And I fill the field 'comment' with 'Reject lead'
        And I check the 'approved' checkbox
        And I select the reason 'Does not have a car' and submit the form
        Then expect the status color should be 'orange'

    @post
    Scenario: TC_019_LEAD-DETAILS - Mark Important
        When I click the button 'Mark Important'
        Then expect button should update to 'Mark Unimportant'
        Then expect the post response 'markImportant' have the following values
            | statusCode     | 200  |
            | body.important | true |

    @post
    Scenario: TC_020_LEAD-DETAILS - Make an appointment
        When I click the button 'Appointment'
        And I select 'Customer Agreed' as appointment type
        And I fill the input field 'subject' with 'This is a test'
        And I select next week as desired calling day
        And I select first available time slot for a call of '5 minutes'
        And I click the button 'Save' in the modal
        Then expect the post response 'calendar' have the following values
            | statusCode                       | 200            |
            | body.appointment.appointmentType | agreed         |
            | body.appointment.subject         | This is a test |

    @post
    Scenario: TC_021_LEAD_DETAILS - Add coupon
        When I click the button 'Add Coupon'
        And I fill the input field 'coupon' with '29032'
        And I click the button 'Apply'
        Then expect the post response 'couponCreate' have the following values
            | statusCode | 201 |
        When I delete the added coupon
        And I click the button 'Confirm'
        Then expect the post response 'couponDelete' have the following values
            | statusCode | 201 |

    # Posting the payment slip gives a internal server error, research needed.
    Scenario: TC_022_LEAD_DETAILS - Add payment slip
        Given I have a confirmed package
        When I click the button 'Add Payslip'
        And drag the 'paymentslip.jpg' inside the designated area
        And I fill the field 'paymentAmount' with value '105000'
        And I fill the field 'paymentDate' with value 'today'
        And I click the button 'CONFIRM PURCHASE'


