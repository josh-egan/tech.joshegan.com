Many of my colleagues have recommended Domain-Driven Design (DDD) as one of the fundamental texts on software architecture. This book is meaty, like a textbook, but still easy to follow. Reading it has been insightful and well worth the time; this book has deepened my understanding of ideas that I've picked up over the years and also opened new ideas up to me. I definitely agree with the recommendation that was given me so I'll pass it along: This book is one of the fundamental texts on software architecture and every software developer would benefit from reading and understanding the ideas in this book.

## Resources

- [DDD Community](http://dddcommunity.org/)

## Terms

One of the goals of Domain-Driven Design is to provide "a technical vocabulary for discussing domain design" [xix]. Well, given the vocabulary, it's useful to know what the words mean.

A glossary is included in DDD, starting on pg. 511, with the following definitions and more.

Term | Definitions
--- | ---
Domain | a sphere of knowledge, influence, or activity
Ubiquitous | existing or being everywhere at the same time

## Principles

### Effective Modeling

See pages 12-17

1. Bind the model and the implementation
1. Cultivate language based on the model
1. Develop a knowledge-rich model
1. Distill the model
1. Continue to learn

The model should be a representation of the domain that highlights the relevant features of the problem being solved. For example, there are different types of maps that use different models to bring out various aspects of the earth. A map intended for travelling by car may completely exclude elevation and other physical features and instead focus entirely on the location of roads and the names of the roads. Another map intended for hikers may include foot paths with a primary focus on land features, elevation, etc. Each map is a model of the physical world that represents the information that is most pertinent to solving the problem at hand.

### Ubiquitous Language

See pages 24-27

> The greatest value of a domain model is that it provides a ubiquitous language that ties domain experts and technologists together. [Foreward]

One of the core ideas discussed repeatedly in this book is that engineers need to be close to subject matter experts and they need to be able to communicate clearly with each other. The ability of an engineering project to succeed is directly related to the engineer's ability to understand the problem domain and create an appropriate model to represent the domain.

You can tell that you're using ubiquitous language if the words you use when talking to domain experts are the same words you use when talking to other developers and are the same words that are typed into the code. Having this type of ubiquitous language removes the need for "translation", and thus removes the inevitable loss of integrity to the problem being solved.

Keep written documentation to a minimum. The ultimate documentation is the code itself. See pages 38-40

> By keeping documents minimal and focusing them on _complementing_ code and conversation, documents can stay connected to the project.

### Hands-on Modelers

> If the people who write the code do not feel responsible for the model, or don't understand how to make the model work for an application, then the model has nothing to do with the software. If developers don't realize that changing code changes the model, then their refactoring will weaken the model rather than strengthen it. Meanwhile, when a modeler is separated from the implementation process, he or she never acquires, or quickly loses, a feel for the constraints of implementation. [61]

> The sharp separation of modeling and programming doesn't work, yet large projects still need technical leaders who coordinate high-level design and modeling ... [62]

### Domain Concepts

#### Entity

See pages 89-96

An "entity" is a domain object that is defined by a thread of continuity or identity. For example, each vehicle is given a vehicle identification number (VIN), and that id makes each vehicle unique. When a system cares about being able to track unique vehicles, the VIN would be an important part of the domain object, making it an entity object.

#### Value Object

See pages 97-102

A "value object" is a domain object that is defined by its properties or characteristics. For example, all of the electrical outlets in a home are identical (except for maybe a few GFCI outlets in the kitchen and bathrooms). In an architecture modeling program, instead of storing many copies of the outlet, it would probably be more efficient to store many pointers to the same outlet.

Sharing value objects can be useful when...

- saving space or object count in the database is critical
- communication overhead is low (such as in a centralized server)
- the shared object is strictly immutable

#### Services

Quick thought here. The first thing I think when I come across this section in the book and start to understand what he's driving at a couple of sentences in: _The word 'services' is **so** overloaded. We need better ubiquitous language to replace this word!_ 

I have started calling this layer **Coordinators**, because the primary job of code in this layer is to coordinate between lower level repositories. The code in this layer is primarily concerned with making decisions based on input and then delegating work to the appropriate code in the layers beneath it.

See pages 104-108

"Service" as described here is code that is stateless and takes action on value objects and or entities.

> When a significant process or transformation in the domain is not a natural responsibility of an entity or value object, add an operation to the model as a standalone interface declared as a service. [106]

#### Modules

See pages 109-111

A module is a collection of entities, value objects, and services that are highly related. A module is commonly expressed in code as a "package". A module can also be a folder within the domain that exports a single interface that exposes high-level interactions and then delegates the work to the services and objects within the module.

## Patterns

### Strategy Pattern

See pages 17-20

Called the "Policy Pattern" in DDD; this pattern is better known as the [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern)

Use the strategy pattern to call out important business behaviors. His example extracts a magic calculation into a class he calls the `OverbookingPolicy`, which makes the code transparently clear why that magic calculation is there.

### Layered Architecture

See pages 67-70

- Presentation
- Application
- Domain
- Infrastructure
