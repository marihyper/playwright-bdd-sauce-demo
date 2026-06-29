Feature: Storefront homepage and navigation

  As a shopper
  I want to browse the storefront and use the main navigation
  So that I can discover products and find my way around the store

  Background:
    Given I am on the homepage

  Scenario: The homepage displays the product catalogue
    Then the page title contains "Sauce Demo"
    And at least one product is shown in the grid

  Scenario Outline: The main menu exposes the key navigation links
    Then the main menu shows a "<link>" link

    Examples:
      | link     |
      | Home     |
      | Catalog  |
      | Blog     |
      | About Us |

  Scenario: Navigating to the catalogue
    When I click the "Catalog" link in the main menu
    Then I am taken to the collections page
