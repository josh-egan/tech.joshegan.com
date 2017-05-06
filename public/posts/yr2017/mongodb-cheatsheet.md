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

https://docs.mongodb.com/manual/reference/mongo-shell/

The mongo shell is an interactive javascript shell. All of the commands are implemented in javascript. To see an implementation of a function, just leave off the parentheses and the function definition will be printed to the console. 

Launch the mongoDB shell:

```bash
mongo
mongo --help
mongo -u username -p password --port 12345 --host localhost
mongo --shell my-script.js
mongo localhost:27017/myDatabase my-script.js
```

To exit the mongo shell type `exit`, type `quit()`, or use the keyboard shortcut `Ctrl+C`.

For a full list of options available when launching mongo see [https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo).

### Customize the Prompt

The prompt can be customized! That's cool. Full docs: https://docs.mongodb.com/manual/tutorial/configure-mongo-shell/#customize-the-prompt

1. Open your [`~/.mongorc.js`](https://docs.mongodb.com/manual/reference/program/mongo/#mongo-mongorc-file) file.
1. Add a function named `prompt`. This function must return a string.
1. It appears that this function has access to all of the commands that are available in the mongo CLI, so you can really make this thing display anything you can dream up.
1. If you want to use a special function like `show`, you'll need to use the JavaScript equivalent of the shell command. A list of equivalents can be found here: https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/#differences-between-interactive-and-scripted-mongo

If I end up doing much work from the command line hitting production boxes, I can imagine this being very useful. I could customize the output based on which host I'm on as a way to constantly remind me which database I'm connected to. 

Here's the function I currently have in my `.mongorc.js` file:

```js
function prompt () {
  return '\n\n' + db + ' > '
}
```

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

### Collection Commands

Command | Notes
--- | ---
`show collections` | Prints the list of collections in the current database.
`db.collection.help()` | Print the help docs for methods available on collection objects.
`db.collection.find().help()` | Show the help for the find method. Complex methods such as the `find` method have their own help docs.
`db.<collectionName>.<method>()` | To execute a method on a collection, the name of the collection is used on the `db` object. e.g. `db.users.stats()`

## Core Concepts

### Documents

Every document contains a unique `_id` field. This field can be provided when inserting a document. If this field is not provided, then it will be automatically created. The `_id` field is a 12 byte hexadecimal number.

### Aggregation

- https://docs.mongodb.com/manual/reference/operator/aggregation/
