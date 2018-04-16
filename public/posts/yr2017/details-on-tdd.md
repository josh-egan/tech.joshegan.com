I was already familiar with unit testing and the concept of TDD (Test-Driven Development) before I started at Pluralsight, but I soon realized that my understanding was just scratching the surface. I have learned much more on this subject so I wanted to do a quick write-up on what I have learned.

As time has gone on, I have continued to add to this post to create a collection of testing resources, articles, and high level concepts. This has made this post more useful as a testing resource and general knowledge page.

## Specific Testing Principles

- [The Three Laws of TDD](http://programmer.97things.oreilly.com/wiki/index.php/The_Three_Laws_of_Test-Driven_Development)
- [Red-Green-Refactor Cycle](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html)
- [Testing Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- Clear definitions of different types of tests in the testing pyramid:
  1. UI: These tests run against the UI in our staging environment. Nothing is mocked. These tests ensure that everything is working together as expected. These are the most fragile tests and we therefore only test critical paths with these type of tests. For web UI tests, we use tools like [Selenium](http://docs.seleniumhq.org/), [Nightwatch](http://nightwatchjs.org/), and [SauceLabs](https://saucelabs.com/).
  1. Acceptance: These tests are for a single application to ensure that everything in an application is working as expected. Nothing is mocked for these tests. For example, all of our APIs have acceptance tests that make a single happy path pass through each endpoint to ensure that everything is working together as expected. One of the awesome things about Node.js is that our acceptance tests start the api server locally, run the tests, and then shut the server down after the tests have run. So awesome.
  1. Integration: These tests cross exactly one boundary to ensure that an integration with a third party service is working as expected. Typically, integration tests are used for external services (databases, apis, etc.) that require some kind of setup in order to ensure that the service is running prior to executing the tests. For example, a repository that accesses the database would have integration tests to thoroughly test (as thouroughly as we do when unit testing) all the expected usages and edge cases for interacting with the database. These tests never have anything mocked because we [don't mock what we don't own](https://github.com/testdouble/contributing-tests/wiki/Don%27t-mock-what-you-don%27t-own).
  1. Unit: Finally, unit tests are for thoroughly testing all possible outcomes with _our_ code. These tests mock out dependencies and test isolated chunks of code. Again, we don't mock what we don't own.
- [Double Loop TDD](http://coding-is-like-cooking.info/2013/04/outside-in-development-with-double-loop-tdd/)
- [don't mock what we don't own](https://github.com/testdouble/contributing-tests/wiki/Don%27t-mock-what-you-don%27t-own)

## General Testing Practices and Theory

### [How to stop hating your tests](http://blog.testdouble.com/posts/2015-11-16-how-to-stop-hating-your-tests)

Talk given by Justin Searls at RubyConf 2015. This 45 minute presentation covers practices to make testing easier.

**Test Structure**

- Too big to fail
    - Big objects are hard to deal with.
    - Tests make big objects even worse.
    - Big objects tend to have lots of branching logic, which then subjects your test code to the rule of product.
    - Avoiding large objects will make testing so much easier, not to mention your production code being straight-forward.
    - Limit new objects to 1 public method and at most 3 dependencies.
- Don't got off script
    - Stick to the same pattern of arrange, act, assert or given, when, then for all tests. Getting creative leads to headaches.
    - If you have a lot of "given" setup, perhaps your subject has too many dependencies.
    - If you have a lot of "when" scenarios, perhaps you could make your api more user friendly with fewer branches.
    - If you have a lot of "then" steps, perhaps your code is doing too much.
- Hard to read, hard to skim
    - Test code is untested code, so minimize the code in test files.
    - Avoid logic in test files.
    - If you're feeling tempted to DRY up your tests, it may be an indicator that your code under test is not designed well.
    - The ability to read and understand a test quickly trumps DRY test code.
- Magic tests
    - Testing libraries can complicate testing if the api is complex.
- Accidentally creative
    - Consistency is golden
    - He always names the thing under test `subject` and the return value `result` or `results`.
    - In consistency can convey meaning if only one test or suite departs from the norm.
    - When we read code, we assume everything has meaning. If a value doesn't matter, make it obvious.

**Test Isolation**

- Unfocused test suites
    - How do you define success in testing?
        - Is it tested?
        - Is the purpose of the test readily apparent?
        - Does the test suite promote consistency?
    - Create separate suites for each type of test.
    - Use conventions and configuration to promote consistency.
- Too realistic
    - More realistic tests are usually not the answer.
    - Realistic tests:
        - are slower
        - take more time to write, change, and debug
        - require higher cognitive load
        - fail for more reasons
    - Clear boundaries increase focus on what's tested and what's controlled.
    - Less integrated, more isolated tests provide better design feedback.
- Redundant coverage
    - Redundant test coverage can kill team morale.
    - Redundant coverage leads to large changes in test files for a single change in a production file.
    - Avoid redundant coverage by have clear layers for what is being tested.
- Careless mocking
    - Mocking should be used to define contracts between modules. 
    - Many people in the world use mocks to "silence" troublesome modules. This is not a good practice.
    - Bad mocks treat the symptoms of test pain, not the cause.
    - Bad mocks greatly confuse future test readers
- Application frameworks
    - If code does not rely on a framework, neither should the tests.
 
 **Test Feedback**
 
 - Error messages
     - Make your tests fail with useful error messages. A useful error message will save loads of time.
     - Judge assertion libraries on their message quality, not only on their api.
- Slow feedback loops
    - You have 480 minutes in every workday. How many feedback loops can you get in during the day?
    - Little nuances in your testing practices can really increase the feedback loop time.
    - Keep your tests fast and your test error messages really useful.
- Painful data
    - Thoughtfully approach your strategy for how to setup data for tests.
    - Inline data creation is a great approach for unit tests.
    - Test fixtures might be useful for integration or acceptance suites.
    - Data dumps might be useful for UI tests.
    - "Self-priming" is probably the only option for stage or production tests.
    - Slow tests are often slow because of data setup.
- Superlinear build slow-down
    - As you keep adding code to existing functions along with tests to your suite, the build time tends to grow exponentially instead of linearly.
    - Keep integration tests to a minimum. Get as much as you can out of each test.
    - Early on, set a firm cap on build duration - and enforce it!
- False Negatives
    - What does it mean when the build fails?
    - Was a test broken, or was the code broken?
    - true negatives reinforce the value of our tests. But they are depressingly rare.
    - false negatives erode our confidence in our test suite. Quickly becomes a drain.
    - Top causes of false negatives:
        - Redundant test coverage
        - Slow tests
    - Try tracking how many false negatives you get in your tests and how long they take to fix.

### [Please don't mock me](https://blog.testdouble.com/posts/2018-03-06-please-dont-mock-me)

Talk given by Justin Searls at the Assert.js 2018 conference. In this one hour presentation he covers a lot of topics related to testing and design including:

- Never use partial mocks of a dependency. Mock the entire dependency, not just select functions.
- Never mock parts of the subject under test. If you find you need to mock parts of the subject under test, that is a glaring signal to refactor and break up the subject code.
- Never partially mock dependencies - either mock all of them or none of them.
- Create a wrapper around external modules so that external modules don't spread through your application. Wrappers do not necessarily need to be tested.
- "Hard to mock code is hard to use code"
- Every function should either test relationships or logic, but never both. Avoid mixed levels of abstraction.
- Understand that tests are designed to fail. Know what should cause your tests to fail. 
    - A test on a function that manages logic will need to be updated if the logic changes.
    - A test on a function that manages relationships will need to be updated if the contracts change.
- Don't mock intermediate modules. Either mock the direct dependency or mock the furthest possible connection point. Avoid mocking some random module in the middle.
- Mock dependencies, but pass real values.
- If you're dealing with legacy code, start by writing high level acceptance tests.
- If you're using mocks to silence side-effects, note that's a smell and modify code design to avoid side effects.
- Allow isolated unit tests to influence the design of your code.
- Take care with how you design assertions, because it can influence code design. Functions should typically return a value. Any function that doesn't return a value likely is a side effect.
- When dependency functions are stubbed, you shouldn't need an assertion that the dependent function was called.
- Using solid testing practices greatly contributes to:
    - reliable incremental progress
    - single-responsibility functions
    - intention-revealing names
    - discoverable organization
    - separate values and logic
    - most functions are synchronous, pure functions

### [Breaking up with your test suite](http://blog.testdouble.com/posts/2014-05-25-breaking-up-with-your-test-suite)

Talk given by Justin Searls on April 3rd, 2014.

- "I get paid for code that works, not for tests, so my philosophy is to test as little as possible to reach a given level of confidence." - Kent Beck
- Each test suite should be targeted to provide 1 level of conifidence or 1 layer of understanding.
- App level (entire application - e.g. web UI tests that rely on all services, APIs, etc. to be up and running)
    - Tests for this level are called by many names (Smoke, Acceptance, Feature, End-to-end) (SAFE tests)
    - Should be written from the perspective of the end user.
    - Should provide confidence that everything works when it's all glued together.
    - Should provide understanding of how simple and easy to use your application is.
        - If it takes more than 30 minutes to run through every possible user endpoint, your application is not simple.
        - If it takes more than 30 minutes to write a test for a new user endpoint, your application is not simple.
    - The tests should not have any knowledge beyond the public interface. No implementation details of internal apis, libraries, etc. should be used by these tests.
    - Enforce a fixed time budget. Choose a maximum amount of time that you're willing to wait while the tests run. Never go over that amount of time. If the amount of time is ever exceeded, either tests need to be removed or you need to create a new suite that can run in parallel with the existing suite.
- Micro-service level (a single service, for example an API)
    - Again, various names for these type of tests. Integration is one, although he hates that word because it is the most overloaded when it comes to testing. He calls them "Consumption" tests.
    - Should written from the perspective of the consumer of the service.
    - Should verify behavior that the service is *directly* responsible for.
    - Should provide understanding of whether or not it is easy to use.
    - Module boundaries should be meaningful beyond testing.
    - Fake all external dependencies. Should be able to run the tests without external services running.
    - Only use public APIs
    - Organize the tests by the consumer's desired outcomes.
    - Keep these tests really fast. If they're slow, and external dependencies are faked, then you know it's your fault if they're slow.
- Inter-service tests - write these type of tests to verify that other services are behaving the way you expect them to behave.
    - He calls them Contract tests.
    - These tests are written from the developer's perspective, to ensure that some 3rd party service is doing what you expect it to do.
    - Include these tests in the other repo's consumption suite if it is an internal application. Include your contact info so that if the tests break the other team knows who to get a hold of.
    - The goal here is speedier feedback. If another team breaks something that you depend on, they will know immediately when the test fails.
    - Should provide confidence that our dependencies behave the way we need them to.
    - Should provide understanding about whether or not the service meets our needs.
    - Frequent test failures may reveal differing priorities.
    - Reveals to the maintainers of the project how their service is being used.
    - If one of the consumers is using the service in a weird way, then perhaps recommend a different service or writing a new one.
    - If all of the consumers are using the service in a weird way, then perhaps the service needs to be re-designed to better meet the needs it is supposed to meet.
- Class level tests - unit tests
    - He calls them "Discovery tests" because the principle value he derives from these tests is discovering good code design.
    - Discover tiny, boring, consistent units of code that break down big, scary problems into small manageable ones.
    - The user of these tests is the first person to call a function. They are concerned with the inputs, outputs, and side effects if any.
    - Concerned with basic code design. Tightly coupled to the implementation.
    - Should provide confidence of logical leaf nodes.
    - Should lead to small, focused units of code. Makes SRP easy.
- Adapter tests
    - These are tests against a 3rd party service that you have no control over.
    - Written from the standpoint of your application trying to understand how to interact with the 3rd party service.
    - Tests should be written in the most realistic context possible.
    - Should provide confidence that your code will work when the 3rd party service changes.
    - Should provide information about outages and breaking changes.
    - Should help you understand which parts of the 3rd party service you depend on and how you are using those parts.
    - Establishes boundaries; prevents 3rd party references from leaking into your app.
    - All of this reduces the cost of replacing dependencies later.
    - Only test adapters when you have good reason to. For the most part, trust that the 3rd party library does what it's supposed to. Most of the time you should be able to write an adapter without worrying about testing the adapter.
    - Adapter test suites can be tricky to run, so be mindful of the gotchas you might run into for a given adapter.
    - Sometimes it might make more sense to test 3rd party services from the SAFE test suite (highest level).
    - Adapter tests tend to be slow, and the speed is outside your control.

## Testing Tools
  
For acceptance, integration, and unit tests, I have used the following libraries:
- [mocha](http://mochajs.org/) with `bdd` style.
- [chai](http://chaijs.com/) with the `expect` assertions because `expect(undefined).to.equal('foo')` will execute whereas `undefined.should.equal('foo')` will explode. Also use the [chai-as-promised](http://chaijs.com/plugins/chai-as-promised/) plugin.
- [should](https://shouldjs.github.io/) for fluent assertions.
- [testdouble](https://github.com/testdouble/testdouble.js) for mocking. This is my preferred mocking library - I have dealt with many of [these](http://blog.testdouble.com/posts/2016-03-13-testdouble-vs-sinon.html) pain points.
- [sinon](http://sinonjs.org/) for mocking.

I have used the following tools for executing tests:
- I most often run tests using `mocha`'s built in `--watch` mode.
- [WebStorm](https://www.jetbrains.com/webstorm/) has an excellent built in test runner that works seamlessly with `mocha`. One of the best parts of using WebStorm to run tests is having clickable links in the stack traces.
- [Wallaby.js](https://wallabyjs.com/) is a continuous test runner that integrates with numerous text editors. I used this heavily for about 6 months, and it was awesome, but in the end this tool fell out of use because it was too much work to keep it configured on all of the workstations. (At Pluralsight, no one on our team has a desk - we paired / mobbed everyday so there is no personal space. Consequently, keeping wallaby running required configuring it on every workstation for every project, and the overhead grew to be too tiring for me and outweighed the benefits. Just using the WebStorm runner in continuous execution mode has been good enough for me.)

For testing React components, here are a couple of insightful articles:
- [The Right Way to Test React Components](https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22)
- [Testing a React-Redux app using Jest and Enzyme](https://medium.com/netscape/testing-a-react-redux-app-using-jest-and-enzyme-b349324803a9)

## Value of Tests

We've had lots of discussions about how to test and what to test. The purpose of testing is to deliver features faster with very few bugs. So our tests are written with that end-goal in mind. We generally follow the shape of the testing pyramid; in other words we typically test in a (off the cuff) ratio of 50:15:5:1. However, like most things, there are exceptions to every rule. For example, in one project, we have abstracted most of the functionality into re-usable, private npm packages because each implementation was so similar. Each npm package is thoroughly unit tested, so in that project we only have acceptance tests and the acceptance tests cover all of the possible paths. We have found that even though the acceptance tests take a little longer to run than unit tests, it's faster in the end to write and maintain these tests for this particular project.

## Testing Scripts

Some tips for making npm scripts work well:
- Use escaped double quotes around file blobs to ensure that they work on Mac, PC, and Linux.
- How to get rid of the ~20 lines of error output that npm pukes out after a failed script?
    - Use the `--silent` flag from the command line, e.g. `npm test --silent`.
    - Add `loglevel=silent` to your `.npmrc` to set the log level to silent for every npm process.
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
