What is cassandra?

Originally developed at Facebook.

[https://app.pluralsight.com/library/courses/cassandra-developers/table-of-contents](https://app.pluralsight.com/library/courses/cassandra-developers/table-of-contents)

All data stored in Cassandra is associated with a token value.

Cassandra instances are called `nodes`.

Virtual nodes (vnodes) are used to distribute token values among a single physical node.

Creating cassandra nodes

Option    | Description
--------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`--seeds` | When adding a new node to an existing Cassandra cluster, the new node should be initialized with a comma separated list of ip addresses of existing nodes using `-seeds <ip-address-1>,<ip-address-2>`
`-dc`     | Give a name of the data center. e.g. `-dc DC-1`
`-rack`   | Give the rack name. e.g. `-rack R-1`

`nodetool`

The `nodetool` command can be run on any node in the cassandra cluster.

Command                            | Description
---------------------------------- | --------------------------------------------------------------------------
`nodetool help`                    | Display help docs.
`nodetool status`                  | Shows the status of the cassandra nodes in the cluster
`nodetool status <keyspace>`       | Shows the status of the cassandra nodes that own the specified keyspace.
`nodetool ring`                    | Shows the token ranges for the node. Each row represents a `vnode`
`nodetool describering <keyspace>` | Shows the token ranges where all data would go for the specified keyspace.
`nodetool repair`                  | Repair inconsistencies in data across nodes.

`cassandra.yaml`

Cassandra configuration is stored in `cassandra.yaml` file. By default, this file is located at `/data/conf/cassandra.yaml`

Property          | Description
----------------- | ---------------------------------------------------------------------------
`num_tokens`      | The number of virtual nodes, `vnodes`, to use in this node. Default is 256.
`seed_provider`   | Defines the seeds for the node.
`endpoint_snitch` | The snitch type for the node.

`cassandra-rackdc.properties`

By default, this file is located at `/data/conf/cassandra-rackdc.properties`

The `dc` (data center) and `rack` are stored in this properties file. This file is read in at node start-up and gossiped out to the other nodes in the cluster.

DATA CENTER

Each data center has its own set of tokens.

TERMINOLOGY

Term      | Meaning
--------- | -------------------------------------------------------------------------------------------------
keyspace  | Data is organized at the highest level into keyspaces. The oracle or mysql analog is tablespace.
table     | Pretty close to mysql definition - columns are defined, and rows of data are stored in the table.
partition | All data is associated with a partition key.

REPLICATION

determined at the keyspace level.

SimpleStrategy

The replication_factor tells cassandra how many copies of each partition in the keyspace to store.

`create keyspace <keyspace-name> with replication = {'class': 'SimpleStrategy', 'replication_factor': 3};`

When using NetworkTopologyStrategy, you specify how many copies of each partition to store in each data center.

`create keyspace <keyspace-name> with replication = {'class': 'NetworkTopologyStrategy', '<dc-name>': 3, '<dc-name>': 2};`

When data is distributed across data centers, that data is distributed equally among the racks in the data center.

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
