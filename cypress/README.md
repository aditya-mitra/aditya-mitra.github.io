## Notes

#### Dark Mode Tests

- Explicitly declare which **colour mode** *(dark mode/light mode)* that you are using in the tests

- Cypress by default takes the **system theme**


#### Difference in CI and Local

- If tests passes locally and fails on CI, it indicates that **configuration for the tests depends on system**

- Same can happen for fonts. Font can vary on linux systems and windows.

Try to make the tests platform independent or specify the platform on CI

#### Serving on PORT

- Ensure that the port responds **before** cypress even runs.


#### Contexts

`before` only runs **once** before all the tests in that context start
Setting a variable in **localStorage** in `before` will not if `cy.visit` again runs on `beforeEach`.