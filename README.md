# [Node.js Blog Post API]

[This is a Node.js API server for a blog post app that uses Express.js and MongoDB. This guide provides instructions on how to run the server on your local machine.]

## Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running on your machine.

## Installing MongoDB and Running the Server

1. Download the MongoDB Community Server from the official MongoDB website (https://www.mongodb.com/try/download/community).

2. Follow the instructions in the installer to install MongoDB on your machine.

3. Once the installation is complete, open a terminal or command prompt and run the following command to start the MongoDB server:

```bash
mongod
```

4. In a separate terminal or command prompt, run the following command to get the DB_URI:

```bash
mongo
```

5. Run the following command inside the MongoDB shell to create a new database named blog-post-db:

```bash
use blog-post-db
```

6. Create a new collection named posts in the blog-post-db database by running the following command:

```bash
db.createCollection('posts')
```

7. Exit the MongoDB shell by running the following command:

```bash
exit
```

## Alternatively, you can use Docker to run MongoDB instead of installing it on your machine. Here's howtodo it:

## Running MongoDB with Docker

1. Install Docker on your machine by following the instructions on the official Docker website (https://docs.docker.com/get-docker/).

2. Open a terminal or command prompt and run the following command to download the MongoDB image:

```bash
docker pull mongo
```

3. Once the image is downloaded, run the following command to start a MongoDB container:

```bash
docker run -d -p 27017:27017 --name mongo mongo
```

This will start a MongoDB container and map the container's port 27017 to the host's port 27017.

4. Open a new terminal or command prompt and run the following command to get the DB_URI:

```bash
docker exec -it mongo mongo
```

Follow steps 5-7 in the previous section to create a new database and collection in MongoDB.

## Setting Up the Node.js Server

1. Clone the repository to your local machine:

```bash
git clone https://github.com/TWhYNoTT/NodeJs.git
```

2. Navigate to the project directory:

```bash
cd NodeJs
```

Install the dependencies:

```bash
npm install
```

3. Add any necessary environment variables to your `.env` file.:

```bash
PORT=3000
DB_URI=mongodb://localhost:27017/blog-post-db
JWT_SECRET_KEY=the-secret-key
JWT_EXPIRE_TIME=90d
```

Replace 3000 with the port number you want to use for the server and mongodb://localhost:27017/blog-post-db with the DB_URI you obtained in step 4 or step 5.

4.Run the server with the following command:

```bash
node app.js
```

The server will now be running on http://localhost:3000. 
