Feature: Product details

  As a shopper
  I want to view a product's details
  So that I can decide whether it is worth buying

  Scenario: Viewing a product shows its key information
    Given I am on the homepage
    When I open the first product
    Then the product name is displayed
    And the product image is displayed
    And the product price looks like a price
    And an "Add to Cart" action is available
