Feature: Product search

  As a shopper
  I want to search the catalogue by keyword
  So that I can quickly find the products I am interested in

  Scenario Outline: Searching returns matching products
    Given I am on the homepage
    When I search for "<term>"
    Then the search results page is shown
    And at least one result matches "<term>"

    Examples:
      | term   |
      | jacket |
      | top    |
