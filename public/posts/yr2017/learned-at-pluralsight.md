I've learned quite a bit in the last two years working at [Pluralsight](https://www.pluralsight.com/). I wanted to capture at a high level many of the things that I've learned. I could write an entire post about each of these items, but I doubt I'll ever have time for that, so I want to at least capture some of what I've learned at a high level.

## Software Practices

- My understanding of TDD has deepended. I actually did get [a post written](/posts/yr2017/details-on-tdd) about what I have learned about testing.
- When to be WET (Write Everything Twice) and when to be [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself). Yes, there are actually times when it is better to be WET than DRY -- too much abstraction can be a bad thing.
- Feature Toggles vs. Feature Branches
    - https://martinfowler.com/articles/feature-toggles.html
    - http://geekswithblogs.net/Optikal/archive/2013/02/10/152069.aspx
    - https://devops.com/feature-branching-vs-feature-flags-whats-right-tool-job/
- Various ways to ensure code quality
    - Pair programming / mob programming. When pairing or mobbing, code is committed directly to master.
    - Pull requests. When working solo, create a branch and then the PR is reviewed by one peer before merging into master.
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

## Tools

- [leankit](https://leankit.com/)

## Design Patterns

- [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern)
- [Mother pattern](https://www.martinfowler.com/bliki/ObjectMother.html)
- [Facade pattern](http://www.tutorialspoint.com/design_pattern/facade_pattern.htm)

## Organizational Practices

- [The Seven Levels of Delegation](https://management30.com/practice/delegation-board/)
- Lean
    - [Kanban](http://kanbanblog.com/explained/)
    - Single-piece flow
        - Great overview: https://www.process.st/one-piece-flow/
        - Video demonstration of single piece flow game: https://www.youtube.com/watch?v=JoLHKSE8sfU
- [Retrospectives](https://www.agilealliance.org/agile-retrospectives-as-a-tool-for-team-learning/)

## Product Practices

- Directed Discovery
    - The process:
         - **Voice of the Customer (VOC)** - Conduct loose interviews with customers to discover what features they want/need in the product. These interviews can also come from employees who have ideas about how to improve the product. It can be particularly useful to ensure that Customer Support has a clear channel into the product stream to ensure the common difficulties for customers get addressed. Sales teams should also have a clear channel for being able to pass along what potential customers are asking for from the product.
         - **Narratives** - Get together with a cross-functional group of people (UX, Dev, PM, etc.) and have everyone write out wireframes to develop the narrative that will drive the new feature.
         - **Initial Design** - Designers build a visual prototype (the prototype is non-functional, no dev work yet) based on the wireframes from the narrative session.
         - **Customer Preference Testing (CPT)** - Show the prototype to real customers and observe their response. Do they like it? Is usage intuitive? Can they figure out what it does and how on their own? What do they see first? etc. A tool like [in vision](https://www.invisionapp.com/) can be really useful for sharing a prototype with customers. Designers iterate on the design based on customer feedback until confidence is high that the product is going to fill a need for the customers.
         - **Initial Build** - Build the feature to match the design.
         - **Rollout** - Use a limited release schedule. If confidence grows, keep releasing to a larger segment of users. If problems arise, both devs and designers iterate and re-work where needed. Pluralsight uses a [Net Promoter Score](https://www.netpromoter.com/know/) (NPS) to gauge whether or not the feature is meeting customer needs. NPS is measured at alpha, beta, and GR releases. A feature could not go to GR without an NPS of >= 80. NPS is measured by a single question answered on a 0-10 scale. Typical release schedule was
             1. internal (employees only)
             1. alpha - 5% of target users (the target users are the users expected to use the feature. Thus 5% of the target users might represent a larger fraction of the total user base, say 20% of the total user base.)
             1. beta - 20% of target users
             1. General Release (GR) - 100% of users
         - **Customer Confirmation Testsing (CCT)** - Primarily through the usage of analytics (which are built into the product from the beginning), determine whether or not the new design is accomplishing the goals that were intended. Can also do phone or video calls with customers to see if they know the feature exists, whether or not they use the feature, and how they use the feature. The feedback from this stage is used to iterate on the feature to keep improving it.
    - Resources
        - [Directed Discovery Framework](https://medium.com/directed-discovery/building-a-people-platform-for-continuous-change-in-technology-218fd9ee60c3)
        - [5 Reasons You Should Use Directed Discover](https://medium.com/directed-discovery/5-reasons-why-you-should-use-directed-discovery-be36caec488d)
        - [The Heartbeat of Product](http://www.mindtheproduct.com/2017/07/heartbeat-product-nate-walkingshaw/)


## Learning Resources

- Massive reading list. Many of my colleagues at Pluralsight are extremely well read. The list of book recommendations I have received from them is enormous; it will take me years and years to get through the reading list I have accumulated.
