This paper addresses complexity in software and how to address it.

## Complexity in Software

Causes of complexity:

- state
- code volume
- flow of control

Why is complexity a problem? The authors assert that _all_ major issues in major software systems stem from complexity.

### Attempting Understanding

> The key problem with testing is that a test (of any kind) that uses one particular set of inputs tells you nothing at all about the behaviour of the system or component when it is given a different set of inputs. The huge number of different possible inputs usually rules out the possibility of testing them all, hence the unavoidable concern with testing will always be — have you performed the right tests?

While I agree with the statement above at face value, I disagree that testing is of low value. Well-designed code with a thorough test suite can yield extremely high confidence. I've built programs in this way while working at Pluralsight, and we only shipped a bug to production maybe once a quarter. Bugs still slipped in a few times a year, but they were few and far between.

### State as a Cause of Complexity

Each possible state that software can get into increases the total number of possible states exponentially. Managing state is critical in managing complexity.

### Code Volume as a Cause of Complexity

Complexity tends to increase as the code volume increases. The complexity increases are somewhere between linear and exponential depending on the software's design.

I agree that code volume is an indicator of complexity. File size and function size are some of the best indicators of complexity within a program. Small files and small functions that follow the single responsibility principle are easy to reason about and keep complexity at a minimum.

### Additional causes of complexity

- Complexity breeds complexity
- Unnecessary abstraction
- Missed abstraction
- Dead code
- Poor modularity
- Poor documentation

Complex code often leads to even more complex code because adding to the mess is usually the path of least resistance.

## Managing Complexity

### Object-oriented programming

- Contained way of managing state.
- Contained way of managing identity.

### Functional programming

### Requirements

Have clear requirements for the software.

### State

Deterministic functions, no side effects!
Immutable data wherever possible.
