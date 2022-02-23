Feature: Signing in to website

    Feature Outline: CRM general
    Reference:

    Lead-General: User with invalid credentials can not login                  ->        TC_001
    Lead-General: User with invalid credentials can not login                  ->        TC_002

    upcoming tests
    - filter functionality on all pages
    - page navigation

    Background: Visit the site's url
        Given I visit the website's url

    Scenario: TC_001_LOGIN - Login failed due to invalid credentials
        When I log in to the site with username 'test' and password 'test'
        Then expect an alert with text 'The provided credentials are invalid, check for spelling mistakes in your password or username, email address, or phone number.' is shown

    Scenario: TC_002_LOGIN - Login with valid credentials
        When I log in to the site with username 'valid' and password 'valid'
        Then expect the url of the site will be 'https://staging-crm.sabye-songkran.com/'