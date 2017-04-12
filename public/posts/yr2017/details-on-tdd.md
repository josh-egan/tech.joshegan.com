I was already familiar with unit testing and the concept of TDD before I started at Pluralsight. However, I have learned much more on this subject. I wanted to do a quick dump on some of the details that I have learned.

- [Double Loop TDD](http://coding-is-like-cooking.info/2013/04/outside-in-development-with-double-loop-tdd/)
- [Testing Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- Clear definitions of different types of tests
  1. UI: These tests run against the UI in our staging environment. Nothing is mocked. These tests ensure that everything is working together as expected. These are the most fragile tests and we therefore only test critical paths with these type of tests. For web UI, we use tools like [Selenium](http://docs.seleniumhq.org/), [Nightwatch](http://nightwatchjs.org/), and [SauceLabs](https://saucelabs.com/).
  1. Acceptance: These tests are for a single application to ensure that everything in an application is working as expected. Nothing is mocked for these tests. For example, all of our APIs have acceptance tests that make a single happy path pass through each endpoint to ensure that everything is working together as expected. One of the awesome things about Node.js is that our acceptance tests start the api server locally, run the tests, and then shut the server down after the tests have run. So awesome.
  1. Integration: These tests cross exactly one boundary to ensure that an integration with third party code is working as expected. For example, a repository that accesses the database would have integration tests to thoroughly test (as thouroughly as we do when unit testing) all the expected usages and edge cases for interacting with the database. These tests never have anything mocked because we [don't mock what we don't own](https://github.com/testdouble/contributing-tests/wiki/Don%27t-mock-what-you-don%27t-own).
  1. Unit: Finally, unit tests are for thoroughly testing all possible outcomes with our code. These tests mock out dependencies and test isolated chunks of code. Again, we don't mock what we don't own.
  
We've had lots of discussions about how to test and what to test. The purpose of testing is to deliver features faster with very few bugs. So our tests are written with that end-goal in mind. We generally  In one project, we have abstracted most of the functionality into re-usable, private npm packages because each implementation was so similar. So in that project, we only have acceptance tests, and the acceptance tests cover all of the possible paths. We have found that even though the acceptance tests take a little longer to run than unit tests, it's faster in the end to write and maintain these tests for this particular project.

Some tips for making npm scripts work well:
- Use escaped double quotes around file blobs to ensure that they work on Mac, PC, and Linux.
- Use `|| true` at the end of your test script to prevent npm from puking all of the error output at the end of a failed test.
- Make sure *not* to use `|| true` if your test script is going to be run in a tool like TeamCity where a failure needs to be meaningful.

```json
{
  "scripts": {
    "test": "./node_modules/.bin/mocha \"./src/**/*.specs.js\"",
    "test-watch": "npm test -- -w",
    "test-teamcity": "npm test -- --reporter mocha-teamcity-reporter",
    "ti": "./node_modules/.bin/mocha ./test/database-setup.js \"./src/**/*.i-specs.js\" || true",
    "ti-watch": "npm run test-integration -- -w",
    "test-integration": "./node_modules/.bin/mocha ./test/database-setup.js \"./src/**/*.i-specs.js\"",
    "test-integration-teamcity": "npm run test-integration -- --reporter mocha-teamcity-reporter",
    "ta": "./node_modules/.bin/mocha \"./src/**/*.a-specs.js\" || true",
    "test-acceptance": "./node_modules/.bin/mocha \"./src/**/*.a-specs.js\"",
    "test-acceptance-teamcity": "npm run test-acceptance -- --reporter mocha-teamcity-reporter",
    "test-all": "npm test && npm run test-integration && npm run test-acceptance"
  }
}
```

