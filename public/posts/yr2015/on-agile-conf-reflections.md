This year I attended the [OnAgile Virtual Conference](http://agilealliance.org/programs/onagile-virtual-conference/). And by 'attended' I mean I logged into the site that hosted the virtual conference and watched the sessions on demand a couple weeks after the event actually took place. I've been watching at a comfortable pace for myself, a few sessions in a sitting. I've also watched sessions that took place simultaneously. There are pros and cons to the virtual world. Watching all the sessions I'm interested in on my own time regardless of session collisions -- definitely a plus.

In an effort to better digest what I hear, I take notes. In an attempt to organize my thoughts, I write. So these are some of my thoughts and reflections from the OnAgile Virtual Conference.

# You Can't be Agile When You're Waist Deep in Mud!
Presented by Martin Fowler and Rachel Laycock, this keynote emphasized following technical practices to ensure that you can really stay agile. This presentation was more of a summary of practices, rather than a deep exploration of any one of them. Here are some of the highlights:
- Continuous Delivery
- 'Already Agile'
- Better Automation
- Treat infrastructure as Code
- In order to actually be agile, a lot of the desirable benefits come back to the code. Successful CI requires a good code base.
- Many projects get stuck at the '1 star' level.
- Only about 30% (or less) are using agile technical practices
- One of the core goals is short cycles and rapid iterations
- Scrum's approach says that you _should_ have technical practices, but those practices are not defined.
- XP's approach says that you should use _these_ practies.
- Key agile practices include TDD, CI, sustainable pace, pair programming
- Goal is to create software that is releasable as soon as possible.
- Self testing code
- TDD is the process by which the tests are created.
- is TDD dead (a video that was referenced)
- In order to understand when tests are useful and when they aren't, you have to have a mature understanding of how to do TDD. There are cases, for example when doing a quick exercise to determine feasibility, when tests may not be useful.
- code ownership
- "my" code and "his" code are terms that should be avoided. The code should belong to the team. This is addressed by pair programming.
- Continuous integration requires a test suite that conveys confidence in the functionality of the code.
- Always be looking for quick feedback cycles.
- The feedback cycle needs to be fast enought to satiate individual tolerance.
- Refactoring
- [The book by Martin Fowler about refactoring](include link to amazon here.)
- The point of refactoring is to make changes to the internal structure of the code without changing its external behavior.
- Take very very small steps, so small they don't seem worth taking. This makes it much more difficult to introduce a bug. It also makes it so that you can catch a breaking change immediately.
- You should not be 'refactoring' and have a bunch of broken tests.
- If you have to take time to understand code, and then you get it, at that point you should refactor and make the code clear.
- Collective code ownership facilitates refactoring. That way, when you see a problem, you can improve it.
- When prioritizing refactoring, you need to think about it upfront. How complex is the task, and how complex is the code base that you'll be working in?
- One idea is to create a technical debt backlog wall. Then work items into the daily work.
- When deciding whether or not to refactor you should consider these three questions:
  1. What bits are complex?
  2. What is the level of test coverage? How confident can you be when you make changes?
  3. Where is the business going?
  4. How often is it changing?

- As soon as you set up quality code / speed of features, you're hosed. You simply cannot deliver quickly in the long term without a quality code base.
- You must ensure that you keep the code base healthy so that you can maintain speed.
- Continuous integration
  - Commit to master all the time.
  - Staying on feature branches, even if builds are automated, is not CI.
  - CI is:
    1. Commit onto trunk.
    2. Commit at least once / day.
    3. Committing and running the tests.

  - CI has been confused with CD (Continuous Delivery)
  - Merge pain is a sign that you're not integrating frequently enough.

- DevOps is a cultural movement, not a team.
- DevOps is an attempt to overcome the antagonistic relationship between ops and devs, whose goals can often differ.
- Creating a 'devops' team can cause even more problems.
- DevOps is a culture of developers and operations working together.
- The most common architecture structure is a ball of mud.
- The problem is that the design evolves over time, and the ball of mud is thus created.
- Requires discipline.
- The best way to address a ball of mud is to not create it in the first place.
- Technical practices are at the core of being able to implement Agile effectively.
