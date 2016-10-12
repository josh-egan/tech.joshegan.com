## Cassandra Resources

- <https://cassandra.apache.org/>
- <http://techblog.netflix.com/2011/11/benchmarking-cassandra-scalability-on.html>
- <https://app.pluralsight.com/library/courses/cassandra-developers>

## About Cassandra

### History

- Originally created at Facebook.
- Open sourced and now an official apache project.

### When to use Cassandra

Cassandra is a great choice for a database when...

- Speed is the top goal and eventual consistency is acceptable.
- Table schema is stable and unlikely to change.

### High Level Overview

Cassandra nodes are typically represented in a ring because there is no master node - it is a true peer to peer system.

All data stored in Cassandra is associated with a token value. Each data center has a set of token values, and each node in the data center is assigned to manage a portion of the token values. Virtual nodes can exist within each node. Virtual nodes distribute the load of token values somewhat randomly, making it so that each vnode is replicated on a different node. See [this article](http://www.datastax.com/dev/blog/virtual-nodes-in-cassandra-1-2) for further reading.

### Terminology

Term      | Meaning
--------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
node      | A server running an instance of cassandra.
token     | A single token associated with a piece of data. "Token" is also often used to refer to a range of tokens.
vnode     | A virtual node. Virtual nodes are used to distribute token values on a single physical node.
dc        | A data center is a grouping of nodes. Each data center has its own set of tokens.
rack      | Each node in a data center is part of a rack. Racks do not require an even distribution of nodes. Data center replication will be evenly distributed among racks. Each rack will evenly distribute the replication among the nodes on the rack.
keyspace  | Data is organized at the highest level into keyspaces. The oracle or mysql analog is tablespace. Replication is specified at the keyspace level.
table     | Pretty close to mysql definition - columns are defined, and rows of data are stored in the table.
partition | All data is associated with a partition key. A table contains partitions.
row       | Also close to mysql definition. Rows represent data within paritions.

## Setting up a Cassandra cluster

### Creating a Sandbox Cluster

This sandbox is created using [docker](https://www.docker.com/), [VirtualBox](https://www.virtualbox.org/), and [boot2docker](http://boot2docker.io/).

```bash
boot2docker --memory=4096 init
boot2docker up
$(boot2docker shellinit)
boot2docker status

docker run --name=n1 -d tobert/cassandra
docker exec -it n1 nodetool status
docker exec -it n1 nodetool ring
docker inspect -f '{{ .NetworkSettings.IPAddress}}' n1
#The inspect command will output an IP address to be used in the next command
docker run --name n2 -d tobert/cassandra -seeds 000.00.0.0
```

### cassandra.yaml

Cassandra configuration is stored in `cassandra.yaml` file. By default this file is located at `/data/conf/cassandra.yaml`.

Property          | Description
----------------- | ---------------------------------------------------------------------------
`num_tokens`      | The number of virtual nodes, `vnodes`, to use in this node. Default is 256.
`seed_provider`   | Defines the seeds for the node.
`endpoint_snitch` | The snitch type for the node.

### Creating Cassandra Nodes with Docker

Option    | Description
--------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`--seeds` | When adding a new node to an existing Cassandra cluster, the new node should be initialized with a comma separated list of ip addresses of existing nodes using `-seeds <ip-address-1>,<ip-address-2>`
`-dc`     | Give a name of the data center. e.g. `-dc DC-1`
`-rack`   | Give the rack name. e.g. `-rack R-1`

### cassandra-rackdc.properties

By default, this file is located at `/data/conf/cassandra-rackdc.properties`

The `dc` (data center) and `rack` are stored in this properties file. This file is read in at node start-up and gossiped out to the other nodes in the cluster.

## Working with cassandra

### CQLSH

The cqlsh command line utility allows for interacting with Cassandra directly.

Command                                        | Description
---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------
`cqlsh`                                        | Launch the shell and connect to the default node. Default is `localhost:9160`; this can be changed by setting `$CQLSH_HOST` and/or `$CQLSH_PORT`
`cqlsh <address>`                              | Connect to a remote node. The address can be an ip address or a url.
`cqlsh <address> -u <user-name>`               | Connect to a remote with the specified user. This will open up an interactive prompt if a password is required.
`cqlsh <address> -u <user-name> -p <password>` | Authenticated remote login. Note that password will be visible as plain text on console if `-p` is used.
`cqlsh -f <file-path.cql>`                     | Execute commands from the file and then exit.
`cqlsh -e "<cql-command>"`                     | Execute a CQL command and then exit. For example, `cqlsh -e "SELECT id FROM sample_keyspace.my_table"`
`cqlsh --cqlversion=<version>`                 | Use the specified version of CQL. For example, `cqlsh --cqlversion=3.0.3`

Once inside of a cqlsh prompt, these commands are available:

Command                            | Description
---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------
`help`                             | Show the help docs.
`use <keyspace>`                   | Use the specified keyspace. Allows accessing tables without prefixing with `keyspace.`.
`tracing <on/off>`                 | Turn tracing on or off
`nodetool`                         | Useful tool for interacting with nodes. The `nodetool` command can be run from cqlsh on any node in the cluster and will yield the same results.
`nodetool help`                    | Display help docs.
`nodetool status`                  | Shows the status of the cassandra nodes in the cluster
`nodetool status <keyspace>`       | Shows the status of the cassandra nodes that own the specified keyspace.
`nodetool ring`                    | Shows the token ranges for the node. Each row represents a `vnode`
`nodetool describering <keyspace>` | Shows the token ranges where all data would go for the specified keyspace.
`nodetool repair`                  | Repair inconsistencies in data across nodes.
`nodetool pausehandoff`            | Pauses automatic hand-offs, or data repair. Can be useful when trying to trace hand-offs.
`nodetool cfstats <table-name>`    | Displays detailed stats on the table, including read and write activity. Useful for ensuring that a table really is not in use before dropping it.

### CQL (Cassandra Query Language)

Command  | Description                        | Examples
-------- | ---------------------------------- | --------------------------------------------------------------------------------------------------
`CREATE` | Use to create a keyspace or table. | `CREATE KEYSPACE sample WITH REPLICATION = {'class':'SimpleStrategy','replication_factor':3};`<br>

<br>
`CREATE TABLE my_table (id text, size int, PRIMARY KEY (id))` `INSERT` | Use to update or insert table data. | `INSERT INTO my_table (id) VALUES ('guid');`

## Junk Drawer

... All the things that don't have a nice tidy home yet...

SimpleStrategy

The replication_factor tells cassandra how many copies of each partition in the keyspace to store.

`create keyspace <keyspace-name> with replication = {'class': 'SimpleStrategy', 'replication_factor': 3};`

When using NetworkTopologyStrategy, you specify how many copies of each partition to store in each data center.

`create keyspace <keyspace-name> with replication = {'class': 'NetworkTopologyStrategy', '<dc-name>': 3, '<dc-name>': 2};`

READS and WRITES

Each node in the cluster functions the same.

The node that you connect to when making a query becomes the 'coordinator node'.

Nodes that get written to in a statement are called replica nodes.

Consistency options: ONE, TWO, THREE, QUORUM, ALL, ANY (any means that just making it to the coordinator node is considered success)

When using multiple data centers, also have these consistency options:

Option         | Description
-------------- | ------------------------------------------------------------------------
`EACH_QUORUM`  | A quorum succeeds in each data center before returning success
`LOCAL_QUORUM` | A quorum succeeds in the data center that contains the coordinator node.
`LOCAL_ONE`    | Same as ONE, but only looks in the data center of the coordinator node.

To see what the default consistency is, run `consistency;`

To set the default consistency to use from the command line, use `consistency <level>;` e.g. `consistency quorum;`
