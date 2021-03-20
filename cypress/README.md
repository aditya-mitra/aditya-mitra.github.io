## Notes

#### Dark Mode Tests

-   Explicitly declare which **colour mode** _(dark mode/light mode)_ that you are using in the tests

-   Cypress by default takes the **system theme**

#### Difference in CI and Local

-   If tests passes locally and fails on CI, it indicates that **configuration for the tests depends on system**

-   Same can happen for fonts. Font can vary on linux systems and windows.

Try to make the tests platform independent or specify the platform on CI

#### Serving on PORT

-   Ensure that the port responds **before** cypress even runs.

#### Contexts

`before` only runs **once** before all the tests in that context start
Setting a variable in **localStorage** in `before` will not if `cy.visit` again runs on `beforeEach`.

### Snapshot Testing

-   Do not test _functionalities_ with snapshot testing.

Result can be differents on basis on viewports or if _fixed positioned_ element changes it position.

-   Testing static items on end-to-end tests would be best for snapshot-image testing.

-   **Do not fail the test** if the snapshot does not match its former one.
