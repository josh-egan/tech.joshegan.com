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

1. Open (create first if needed) your [`~/.mongorc.js`](https://docs.mongodb.com/manual/reference/program/mongo/#mongo-mongorc-file) file.
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
`exit` | Close the mongo db shell.
`quit()` | Another way to close the shell.


### Database Commands

Command | Notes
--- | ---
`db` | Displays the database that you're currently using.
`show dbs` | Displays the databases available on the server.
`use <db>` | Set the named database as the current database.
`db.help()` | Print the help docs for all of the database commands.
`db.stats()` | Print the stats for the current database.

### Collection Commands

In this section, `cn` is used as an abbreviation for `collectionName`.

Command | Notes
--- | ---
`show collections` | Prints the list of collections in the current database.
`db.collection.help()` | Print the help docs for methods available on collection objects.
`db.<cn>.<method>()` | To execute a method on a collection, the name of the collection is used on the `db` object. e.g. `db.users.stats()`
`db.<cn>.insertOne({key: 'value'})` | Create a single document. If the collection does not exist, it will be created. Use JavaScript object syntax.
`db.<cn>.insertMany([])` | Create many documents. Supply an array of objects.
`db.<cn>.find()` | Retrieve documents. This method has a lot going on. See the section below dedicated specifically to this `find` method.

#### `db.<cn>.find()`

The find method is one of the more complex collection methods, so it gets its own section here in the post. Complex methods have their own help docs. The `find` help docs can be accessed via: `db.collection.find().help()` 

Here's some seed data that can be used to try out these commands on:

```javascript
db.inventory.insertMany([
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);
```

The anatomy of the find method: 

`var cursor = find(<predicate>, <projection>)`

##### The predicate

The find predicate is used to define query criteria. The full [query help docs](https://docs.mongodb.com/manual/tutorial/query-documents/).

mongo query | SQL equivalent
--- | ---
`db.inventory.find({})` | `SELECT * FROM inventory`
`db.inventory.find({ status: 'D' })` | `SELECT * FROM inventory WHERE status = "D"`
`db.inventory.find({ item: { $in: ['paper', 'planner'] } })` | `SELECT * FROM inventory WHERE item IN ("paper", "planner")`
`db.inventory.find({ status: 'A', qty: { $lt: 48 } })` | `SELECT * FROM inventory WHERE status = "A" AND qty < 48`
`db.inventory.find({ $or: [ { status: 'A' }, { qty: { $gt: 90 } } ] })` | `SELECT * FROM inventory WHERE status = "A" OR qty > 90`
`db.inventory.find({ item: /^p/,  $or: [ { status: 'A' }, { qty: { $gt: 90 } } ] })` | `SELECT * FROM inventory WHERE item LIKE "p%" AND (status = "A" OR qty > 90)`
 
[Query operators](https://docs.mongodb.com/manual/reference/operator/query-comparison/): `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`

##### The projection

Projection is used to transform the found object into a new object. Projection can be used to include or exclude fields, rename fields, and also to do simple transformations.

To include a field use a `1`, to exclude a field use a `0`. A projection cannot have a mixture of inclusions and exclusions, although you can exclude the `_id` field.

mongo query | SQL equivalent
--- | ---
`db.inventory.find({})` | `SELECT * FROM inventory`
`db.inventory.find({}, { item: 1, status: 1 })` | `SELECT _id, item, status FROM inventory`
`db.inventory.find({}, { _id: 0, item: 1 })` | `SELECT item FROM inventory`
`db.inventory.find({}, { _id: 0, size: 0 })` | `SELECT item, qty, status FROM inventory`
`db.inventory.find({}, { _id: 0, "size.uom": 1 })` | 
`db.inventory.find({}, { _id: 0, itemName: "$item" })` | 

##### The cursor

The `find()` method returns a cursor. There are a [whole bunch](https://docs.mongodb.com/manual/reference/method/js-cursor/) of cursor methods. Some of the cursor methods include: `sort`, `limit`, `min`, `max`, and `forEach`

`db.inventory.find({}).limit(3).sort({ qty: 1})`


## Core Concepts

### Documents

Every document contains a unique `_id` field. This field can be provided when inserting a document. If this field is not provided, then it will be automatically created. The `_id` field is a 12 byte hexadecimal number.

### Aggregation

- https://docs.mongodb.com/manual/reference/operator/aggregation/

#### Projection Operator

Within aggregation, projection can do more than within a find() command. Aggregation projection docs are [here](https://docs.mongodb.com/manual/reference/operator/aggregation/project/).
