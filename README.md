# xmpp-client
An attempt at creating a cross-platform XMPP client.

#### Note
Some tests requires mongooseim or any other xmpp server to be running locally and seeded with a test user. 
Easiest way is to 
1. download and install from package ```https://www.erlang-solutions.com/resources/download.html``` follow the installation process.
2. Then start it with ``` mongooseimctl live ```. 
3. Then open another terminal and add some test users
 ```mongooseimctl register user1 localhost password &&  mongooseimctl register user2 localhost password ```