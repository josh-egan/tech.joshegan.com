I've learned quite a bit in the last two years working at [Pluralsight](https://www.pluralsight.com/). I wanted to capture at a high level many of the things that I've learned. I could write an entire post about each of these items, but I doubt I'll ever have time for that, so I want to at least capture some of what I've learned at a high level.

## Practices

- My understanding of TDD has deepended. I actually did get [a post written](/posts/yr2017/details-on-tdd) about what I have learned about testing.
- When to be WET (Write Everything Twice) and when to be [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself). Yes, there are actually times when it is better to be WET than DRY -- too much abstraction can be a bad thing.
- Feature Toggles vs. Feature Branches
    - https://martinfowler.com/articles/feature-toggles.html
    - http://geekswithblogs.net/Optikal/archive/2013/02/10/152069.aspx
    - https://devops.com/feature-branching-vs-feature-flags-whats-right-tool-job/
- Pair programming / mob programming
- Pull requests
- Lean
- [Kanban](http://kanbanblog.com/explained/)
- [Retrospectives](https://www.agilealliance.org/agile-retrospectives-as-a-tool-for-team-learning/)
- [REST apis](http://www.restapitutorial.com/) and several standards, e.g. [JSON API](http://jsonapi.org/)
- [12 Factor App](https://12factor.net/)
- Database migration process
    - Setup a multi-purpose base class to handle migrations. This class can manage all of the following states via feature toggles. This base class can also be called from a script to move data from the old db to the new db.
    - Turn on the shadow writes to the new db and then run a script to move all of the data from the old db to the new db. By the time this script finishes, the two databases should be equivalent.
    - Shadow read / write to new db. Compare results to old db and log discrepancies as errors. Always trust the values from the old db. 
    - Run a script after a week or two of use to compare the entire contents of the old and new dbs. If there are any discrepancies, figure out why the discrepancy occurred, fix all discrepancies, and then start over on the shadow reads / writes.
    - Read / write to new repo and trust values from new repo. Continue to shadow read / write to old db, compare results, and log discrepancies as errors.
    - Turn off shadow reads / writes to the old db. Delete the old table.

## Architecture

- Asynchronous messaging architecture. There's a ton written on this topic; [this article](https://www.infoq.com/articles/integration-mistakes) has some good info.
- Application architecture patterns
    - Presentation / Application / Domain
    - Feature Based
- Domain Driven Design (DDD) Principles
    - [Anti-corruption Layer](http://ddd.fed.wiki.org/view/welcome-visitors/view/anticorruption-layer) -- [an example of building one](https://martinfowler.com/articles/refactoring-external-service.html)
    - [Command Query Responsibility Segregation (CQRS)](https://martinfowler.com/bliki/CQRS.html)

## Technologies

- Node.js
- React.js
- CSS modules
- npm
- PostgreSQL
- Cassandra

## Design Patterns

- [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern)
- [Mother pattern](https://www.martinfowler.com/bliki/ObjectMother.html)
- [Facade pattern](http://www.tutorialspoint.com/design_pattern/facade_pattern.htm)

## Learning Resources

- Massive reading list. Many of my colleagues at Pluralsight are extremely well read. The list of book recommendations I have received from them is enormous; it will take me years and years to get through the reading list I have accumulated.
