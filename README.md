### node-item-list
A simple list CRUD containerized web app with a MERN stack.

### To stand up the web app:

#### Build docker containers
Execute`docker build -t node-item-list -f node.dockerfile . ` from command line in project root dir.

If you're on an Apple M1 chip, remove `--platform linux/amd64` from mysql.dockerfile `FROM` line.

Execute `docker build -t mysql -f mysql.dockerfile .` from commandline in project root dir.

#### Run docker containers
Verify that no other containers are running, because the mysql container's IP address is hardcoded in src/sql.js:4.

Execute `docker run -dp 3306:3306 --name mysql -e MYSQL_DATABASE=itemlist -e MYSQL_ROOT_PASSWORD=secret mysql` from commandline in project root dir.

Execute `docker run -dp 80:80 -v "$(pwd)":/app --name node-item-list -d node-item-list` from commandline in project root dir.

#### Run web app
Browse to `http://localhost` to use the app.
