# Sauce Demo — Playwright + TypeScript (BDD / Gherkin)

A small, self-contained end-to-end test suite that demonstrates **Behaviour-Driven
Development** with [Playwright](https://playwright.dev/),
[playwright-bdd](https://vitalets.github.io/playwright-bdd/) and TypeScript against the
live public Shopify storefront at **https://sauce-demo.myshopify.com/**.

Scenarios are written in plain **Gherkin** (`Feature` / user story / `Scenario` /
`Given`-`When`-`Then`) so stakeholders can read and review them without touching code.
Each step is backed by a TypeScript step definition that drives the app via the Page
Object Model. Tests run on Chromium and Firefox.

## How it fits together

```
features/*.feature   ──►  business-readable Gherkin (the spec stakeholders review)
steps/*.steps.ts     ──►  step definitions: map each Given/When/Then line to code
steps/fixtures.ts    ──►  wires the Page Objects in as BDD fixtures
pages/*.ts           ──►  Page Object Model (the actual selectors & actions)
        │
        ▼  `bddgen` reads features + steps and generates...
.features-gen/       ──►  runnable Playwright tests (generated; git-ignored)
```

`bddgen` is run automatically by the npm scripts below, so you normally never invoke it
by hand.

## Features covered

| Feature file | User story | Scenarios |
| --- | --- | --- |
| `features/homepage.feature` | Browse the store & navigate | Catalogue is shown; main-menu links exist (Home/Catalog/Blog/About Us via a Scenario Outline); navigating to the catalogue. |
| `features/search.feature` | Search the catalogue | Searching returns matching products (Scenario Outline over "jacket" and "top"). |
| `features/product.feature` | View product details | A product shows its name, price (currency-shaped) and image, and an Add-to-Cart action. |
| `features/cart.feature` | Add products to the cart | Adding a product increments the cart count and the item appears in `/cart`. |

There are 10 scenarios in total; the two `Scenario Outline`s expand over their
`Examples`, so a full run executes **20 tests** (10 scenarios × 2 browsers).

## What a feature looks like

```gherkin
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
```

This is the artifact stakeholders review — no code, just business language. Each line
maps to a reusable step definition in `steps/`. In reports, tests are named
**Feature › Scenario** (e.g. *Shopping cart › Adding a product to the cart*) with every
`Given`/`When`/`Then` shown as an individually-timed step.

## Prerequisites

- [Node.js](https://nodejs.org/) LTS (v18 or newer) and npm.

## Setup

```bash
npm install
npx playwright install chromium firefox
```

## Running the tests

```bash
npm test               # generate (bddgen) + run all scenarios, Chromium + Firefox
npm run test:headed    # run with browsers visible
npm run test:ui        # interactive Playwright UI mode
npm run test:chromium  # Chromium only
npm run test:firefox   # Firefox only
npm run report         # open the last HTML report
```

> Running `npx playwright test` directly will use whatever was last generated. Use
> `npm test` (or run `npx bddgen` first) so the generated tests reflect your latest
> `.feature` / step changes.

A helper for updating selectors against the live DOM:

```bash
npm run codegen        # opens the site and records selectors/actions
```

## Adding a scenario

Thanks to BDD, new scenarios are mostly **composed from existing steps**:

1. Add a `Scenario:` to a `.feature` file using sentences that already exist as steps
   (e.g. `Given I am on the homepage`, `When I open the first product`).
2. Only if you introduce a brand-new sentence do you add a matching step definition in
   `steps/` — and `bddgen` will tell you ("undefined step") if one is missing.

## Project layout

```
sauce-demo-playwright/
├── playwright.config.ts   # baseURL, chromium + firefox, reporters, defineBddConfig
├── tsconfig.json
├── features/              # Gherkin .feature files (the readable spec)
│   ├── homepage.feature
│   ├── search.feature
│   ├── product.feature
│   └── cart.feature
├── steps/                 # step definitions + Page Object fixtures
│   ├── fixtures.ts
│   ├── navigation.steps.ts
│   ├── homepage.steps.ts
│   ├── search.steps.ts
│   ├── product.steps.ts
│   └── cart.steps.ts
└── pages/                 # Page Object Model
    ├── BasePage.ts
    ├── HomePage.ts
    ├── SearchResultsPage.ts
    ├── ProductPage.ts
    └── CartPage.ts
```

## Note on testing a live site

This suite runs against a real, public Shopify store whose content (product names,
prices, stock) can change at any time. Assertions are therefore intentionally loose
where it matters — for example, the product scenario checks that the price *looks like*
a currency value (`£NN.NN`) rather than asserting an exact amount. The config enables
retries on CI plus traces and screenshots on failure to help diagnose any transient
network flakiness. If the store's theme changes and a selector breaks, use
`npm run codegen` to capture the new markup and update the relevant page object — the
`.feature` files stay untouched.
