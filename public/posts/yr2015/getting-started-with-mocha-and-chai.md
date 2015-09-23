In this post I want to detail the process for getting started with the [mocha](http://mochajs.org/) test framework and the [chai](http://chaijs.com/) assertion library. The code that accompanies this post can be found [on github](https://github.com/josh-egan/sandbox_mocha-chai).

Assuming that you're starting from a clean slate, we'll start from the ground up with configuration and move into basic usage.

From an empty repo location, perhaps with just a README and a license file, initialize your `package.json` file from the command line using `npm init`. If you're not familiar with npm, you can [scan the docs](https://docs.npmjs.com/) to get to know npm better. After initializing and then adding `"private": true`, my `package.json` looks like this:

```json
{
  "name": "sandbox_mocha-chai",
  "version": "0.0.1",
  "description": "A sandbox for configuring and using the mocha test framework and the chai assertion library",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/josh-egan/sandbox_mocha-chai.git"
  },
  "private": true,
  "keywords": [
    "mocha",
    "chai"
  ],
  "author": "Joshua Egan",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/josh-egan/sandbox_mocha-chai/issues"
  },
  "homepage": "https://github.com/josh-egan/sandbox_mocha-chai"
}
```

Next let's install mocha. From the command line use:

```cmd
npm install mocha --save-dev
```

Now let's write a command to run the tests. This can be done in various ways. I like to use npm scripts, so open up the `package.json` file and add the following script:

```json
{
  "scripts": {
      "test": "./node_modules/.bin/mocha ./src/math-module.specs.js --ui bdd --reporter progress"
    }
}
```

I like to think of npm scripts as aliases for more complex scripts. So every time I want to run mocha, instead of typing the command above, all I have to type is `npm test`. As a side node, npm has a couple of special commands, namely `start` and `test`, so for additional scripts, you would type `npm run my-awesome-script`, with `run` being the key addition there.

So let's break down the above script. We're calling the mocha cli and telling it which test files to execute and which options to use.  First, mocha accepts one or more file glob patterns. The pattern above will run a single test file, namely `math-module.specs.js`. The `--ui  bdd` option sets the user interface to bdd. There are [a few user interfaces to choose from](http://mochajs.org/#interfaces). Finally, the `--reporter progress` option sets the reporter to the progress reporter. There are [a number of built in reporters](http://mochajs.org/#reporters). There are also quite a few custom reporters that can be [installed using npm](https://www.npmjs.com/search?q=mocha+reporter). I wrote a small reporter that I like to use called the [mocha-minimalist-reporter](https://www.npmjs.com/package/mocha-minimalist-reporter).

I'm only using a few of the mocha cli parameters in this intro, but a complete guide to mocha's cli usage [is detailed here](http://mochajs.org/#usage). So check it out if you need mocha to do something in particular for you.

Cool, so now we're ready to write some tests! Create a `src` folder, and then create a file named `math-module.specs.js` in the src folder. Here's what mine looks like:

```js
describe('math module', function () {
  describe('add', function () {
    it('should correctly add positive numbers', function () {
      throw "Not implemented..."
    })
  })
})
```

Save the file and go back to the console and run `npm test` and you should see your first failing test!

Not super interesting yet, so let's introduce some assertions. mocha will work with any assertion library, so if you've got a favorite, you can use it. I've been using chai for a while, so we'll use it here. Let's start by bringing chai in using npm:

```cmd
npm install chai --save-dev
```

Now let's use chai. At the top of the specs file, import and configure chai as follows:

```js
var chai = require('chai')

var expect = chai.expect
```

Let me take a moment to just add that you might need to add this line  immediately after the import statement.

```js
// If failing tests don't show a stack trace, try using this setting
chai.config.includeStack = true
```

I once ran into an issue where my stack traces for failing tests were getting completely swallowed. Setting this to true solved the issue for me. It took me a long time before I finally discovered that this little configuration value was causing my problem. I'm still not sure why the stack trace completely disappeared, because normally the stack trace shows up even with that setting set to false, which is the default. But there was a lot going on in that project, including using babel and transpiling es6 and es7 code, so perhaps something just wasn't playing nice.

There are [several assertion styles](http://chaijs.com/guide/styles/) that chai supports. I like to use the `expect` style. It is a bdd style, and I prefer 'expect' over 'should' because of this scenario:

```js
var result = myObject.thisMethodReturnsUndefined()

expect(result).to.be.undefined //Works like a charm
result.should.be.undefined //Goes down in flames
```

So now that we've brought chai in, lets make an assertion in our test:

```js
it('should correctly add positive numbers', function () {
  var result = 3 + 3

  expect(result).to.equal(5)
})
```

With that failing test written, run `npm test` in the console and you should get a nice failure message describing the fact that 6 is not equal to 5.

Modify the test to make it pass, run it again, and enjoy the feeling that comes from seeing all of your tests pass. :)

Now that we've got our environment up and running, let's actually test some production code.

First, modify the specs file to bring in the math module by adding this to the top of the file:

```js
var mathModule = require('./math-module')
```

Running the tests should fail because the math module doesn't exist yet, so create a file in the src folder named `math-module.js` and give it some meaningful code like so:

```js
console.log("i'm alive!")
```

Running the tests should pass at this point and you should see the output in the console.

So now let's update the test method to call the add method on the math module.

```js
it('should correctly add positive numbers', function () {
  var result = mathModule.add(3, 2)

  expect(result).to.equal(5)
})
```

Running that test should fail because the method doesn't exist yet. So lets replace all the code in the `math-module.js` file with this:

```js
var mathModule = {
  add: function (a, b) {
    return a + b
  }
}

module.exports = mathModule
```

Run the tests again, and we're passing now! Excellent! :)

If you've actually been following the steps I've been detailing and running the tests each time I've been running them, you'll agree that it's starting to get aggravating to change windows and run `npm test` after every little change. Enter mocha's watch ability.

Let's add a script called `test-watch` to our `package.json` file.

```json
{
  "scripts": {
    "test": "./node_modules/.bin/mocha ./src/math-module.specs.js --ui bdd --reporter progress",
    "test-watch": "./node_modules/.bin/mocha ./src/math-module.specs.js --ui bdd --reporter progress --watch"
  }
}
```

Note the `--watch` flag at the end of the line. Now let's run the watch command using

```cmd
npm run test-watch
```

Now, every time a file is saved the tests will get re-run! So much better. :) Add a test case and save the file just to prove it to yourself. My updated tests look like this now:

```js
var chai = require('chai')
var mathModule = require('./math-module')

var expect = chai.expect

describe('math module', function () {
  describe('add', function () {
    it('should correctly add positive numbers', function () {
      var result = mathModule.add(3, 2)

      expect(result).to.equal(5)
    })

    it('should correctly add negative numbers', function () {
      var result = mathModule.add(-3, -5)

      expect(result).to.equal(-8)
    })
  })
})

```

Note that one limitation of the mocha watcher is that it currently doesn't pick up new files. So anytime you create a new file, you'll have to kill the watcher with `CTRL+C` and then restart it.

Let's go back to the `package.json` file and refactor it a bit. Notice how our scripts include so much duplication? Well, there's a nice little trick we can use to cut out the duplication. Modify the `test-watch` script as follows:

```json
{
  "scripts": {
  "test": "./node_modules/.bin/mocha ./src/math-module.specs.js --ui bdd --reporter progress",
  "test-watch": "npm test -- --watch"
  }
}
```

The `--` double dash will run the specified script and then pass the additional parameters in. It's a pretty nice trick I picked up from a co-worker a few months ago. This can also be used to override parameters. For example, let's say you want a specific command to run on your build server, such as [TeamCity](https://www.jetbrains.com/teamcity/). Well, if you're using TeamCity, you can npm install the [mocha-teamcity-reporter](https://www.npmjs.com/package/mocha-teamcity-reporter) and then create a script like so:

```json
{
  "scripts": {
    "test": "./node_modules/.bin/mocha ./src/math-module.specs.js --ui bdd --reporter progress",
    "test-watch": "npm test -- --watch",
    "test-teamcity": "npm test -- --reporter mocha-teamcity-reporter"
  }
}
```

Let's also change the file glob so that we run the tests in every file that ends with ".specs.js" instead of just looking for that single file.

```json
{
  "scripts": {
    "test": "./node_modules/.bin/mocha ./**/*.specs.js --ui bdd --reporter progress",
    "test-watch": "npm test -- --watch",
    "test-teamcity": "npm test -- --reporter mocha-teamcity-reporter"
  }
}
```

And now, what if we want to run a code coverage tool, such as [istanbul](https://www.npmjs.com/package/istanbul)? That script would look something like this:

```json
{
  "scripts": {
  "test": "./node_modules/.bin/mocha ./**/*.specs.js --ui bdd --reporter progress",
  "test-watch": "npm test -- --watch",
  "test-teamcity": "npm test -- --reporter mocha-teamcity-reporter",
  "test-coverage": "./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha"
  }
}
```

But at this point, how do we pass in our mocha options? We can't do it from the command line, because the command line parameters go to the istanbul cli. Well, we can create a `mocha.opts` file to set the base options. This way, we can specify our default options that will be applied any time mocha is run. Options passed in at the command line, for example in our `test-teamcity` script, will override the options in the `mocha.opts` file. It is a requirement that the options file be located at `test/mocha.opts`, so you can't get creative on the file location or the file name. So let's create the file and add our defaults like so:

```cmd
./**/*.specs.js
--ui bdd
--reporter mocha-minimalist-reporter
```

You may have caught that I went ahead and changed the reporter to the minimalist reporter. :) A quick

```cmd
npm install mocha-minimalist-reporter --save-dev
```

was all that we needed to get the minimalist.

Now that we have the `mocha.opts` file, we can update our scripts like so:

```json
{
  "scripts": {
    "test": "./node_modules/.bin/mocha",
    "test-watch": "npm test -- --watch",
    "test-teamcity": "npm test -- --reporter mocha-teamcity-reporter",
    "test-coverage": "./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha"
  }
}
```

Go ahead and run the tests and try out the new scripts if you haven't already. They're working great.

You may have noticed that I have used the verbose parameters in all of the scripts (e.g. `--watch` instead of `-w`). I choose to do that because typing out the verbose parameter in the script I think is well worth a few extra keystrokes because of how easy it is to understand the script when you come back to look at it a couple months from now, or when someone new comes onto the project. No need to look up the docs to remember what `-R` stands for if the option explicitly states `--reporter`. When typing from the command line, I do use the shorter option, but for scripts I prefer to be verbose.

That concludes our basic configuration and usage of mocha and chai. As a reminder, all of the code for this post can be found [on github](https://github.com/josh-egan/sandbox_mocha-chai). Check out the [mocha docs](http://mochajs.org/) and the [chai docs](http://chaijs.com/api/) for more details about what these libraries can do for you.
