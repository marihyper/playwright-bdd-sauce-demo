Feature: Shopping cart

  As a shopper
  I want to add a product to my cart
  So that I can purchase it later

  Scenario: Adding a product to the cart
    Given I am on the homepage
    And I open the first product
    When I add the product to the cart
    Then the cart count shows 1 item
    And the product appears in the cart
