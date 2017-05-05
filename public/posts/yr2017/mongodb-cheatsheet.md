## Resources

### mongoDB

- https://docs.mongodb.com/
- https://docs.mongodb.com/manual/
- https://docs.mongodb.com/getting-started/shell/ 
- https://university.mongodb.com/
- https://www.tutorialspoint.com/mongodb/

### mongoose

- http://mongoosejs.com/index.html
- http://mongoosejs.com/docs/guide.html

## About

### What sets mongo apart?

- noSQL
- document store
- Schema-less. A given collection can hold documents of differing schemas.

### History

> The company was first established in 2007 as 10gen. Based in New York City, 10gen was founded by former DoubleClick founder and CTO Dwight Merriman and former DoubleClick CEO and Gilt Groupe founder Kevin P. Ryan with former Doubleclick engineer and ShopWiki founder and CTO Eliot Horowitz and received $81 million in venture capital funding from Flybridge Capital Partners, In-Q-Tel, Intel Capital, New Enterprise Associates (NEA), Red Hat, Sequoia Capital, and Union Square Ventures. 10gen originally aimed to build a platform as a service architecture based entirely on open source components; however, the company was unable to find an existing database platform that met their "principles" for a cloud architecture. As a result, the company began to develop a document-oriented database system it called MongoDB. After realizing the potential of the software on its own, 10gen's team decided to scrap its cloud platform and focus on maintaining MongoDB instead. - [Wikipedia](https://en.wikipedia.org/wiki/MongoDB_Inc.#History)

### Terminology

Term | Definition
--- | ---
Database | A physical container for collections. Each database gets its own set of files on the file system. A single MongoDB server typically has multiple databases.
Collection | A group of MongoDB documents. It is the equivalent of an RDBMS table.
Document | A set of key-value pairs. Documents have dynamic schema. Dynamic schema means that documents in the same collection do not need to have the same set of fields or structure, and common fields in a collection's documents may hold different types of data. A document is the equivalent of an RDBMS row.
Field | A key-value pair of data within a document. A field is the equivalent of an RDBMS column.

## Installation

https://docs.mongodb.com/manual/installation/

Installation on a mac:
```bash
brew update
brew install mongodb
brew services start mongodb
```

The default port on a mongo installation is `27017`.

## mongoDB CLI

Launch the mongoDB shell:
```bash
mongo
mongo --help
mongo -u username -p password --port 12345 --host localhost
mongo --shell my-script.js
```

To exit the mongo shell type `exit`, type `quit()`, or use the keyboard shortcut `Ctrl+C`.

For a full list of options available when launching mongo see [https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo).

### Root Commands

Command | Notes
--- | ---
`help` | Prints the help docs for the root commands.


### Database Commands

Command | Notes
--- | ---
`db` | Displays the database that you're currently using.
`show dbs` | Displays the databases available on the server.
`use <db>` | Set the named database as the current database.
`db.help()` | Print the help docs for all of the database commands.
`db.stats()` | Print the stats for the current database.

## Core Concepts

### Documents

Every document contains a unique `_id` field. This field can be provided when inserting a document. If this field is not provided, then it will be automatically created. The `_id` field is a 12 byte hexadecimal number.

### Aggregation

- https://docs.mongodb.com/manual/reference/operator/aggregation/
