#

I'm working on getting a node server up and running in aws and figured I would document the steps I'm taking.

## Front Matter

### Prerequisites

- Have a node.js app that is ready to launch on a server
- Have an aws account.

### Goals

- Launch a `t2.micro` linux server (free tier)
- Run a `node.js` web app on the server
- Run a `node.js` RESTful api on the server
- Launch a `db.t2.micro` mysql rds instance

Services will be launched manually, as opposed to programatically.

### Resources

[AWS free tier details](https://aws.amazon.com/free/)
[AWS RDS mysql instance pricing](https://aws.amazon.com/rds/mysql/pricing/)
[AWS ec2 instance pricing](https://aws.amazon.com/ec2/pricing/)

## Launch the Services

### Launch an EC2 instance

1. Ensure that you're in the region you want to be in. Currently, the dropdown is in the top-right of the UI. Current options include `US East` and `US West`. I'm using `US West (Oregon)`.
1. From the AWS dashboard, click on EC2
1. On the EC2 dashboard, locate and click on the `Launch Instance` button.
1. Select an image. I'm going to use Red Hat Linux.
1. Choose your instance type then click next. I'm going with `t2.micro`, which is free tier eligible.
1. Configure Instance details
  - Set Auto-assign Public IP to `Enable` - we want this to have a pubic IP.
  - Leave all other settings as default and click next
1. Add 10 GB of storage and click next
1. Add tags. For example, give the server a name.
1. Configure Security Group
  - Create a new security group for this server.
  - Give the security group a meaningful name and description.
  - If it doesn't already have it, add the `SSH` group.
  - Add the `HTTP` group, which exposes `TCP` traffic on port 80. This will be for the web app.
  - Add a `Custom TCP Rule` to expose `TCP` traffic on a specified port. Choose a port to expose. This port will be for the api.
1. Click Review and Launch
1. Click Launch
1. Create a new key pair
  1. Choose `Create a new key pair` from the dropdown
  1. Give the key pair a name.
  1. Click the download button and save the key to a secure location. Keys should be stored and handled with great care.
1. Click Launch

The instance is now launched! Click on it to check it out.
