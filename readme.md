# Node and Express Server Readme
This repository contains a Node.js and Express server that can be used as a starting point for developing web applications. This readme file provides instructions on how to set up and start the server.

## Prerequisites
Before starting the server, ensure that you have the following software installed on your machine:

1. Node.js (version 12 or higher)
2. npm (Node Package Manager)
### Installation
1. Clone this repository to your local machine or download the source code as a ZIP file.
2. Navigate to the project directory in your terminal or command prompt.
3. Run the following command to install the dependencies:

```
npm install
```
### Configuration
The server relies on environment variables for configuration. Rename the .env.example file to .env and update the values with your desired configuration.

The available environment variables are:

```
DATABASE_LOCAL:
PORT:
JWT: 
CLOUD_NAME: 
API_KEY: 
API_SECRET:
```

Starting the Server
To start the server, run the following command:
```
npm run dev
```
This will start the server in development mode using Nodemon, which automatically restarts the server whenever changes are made to the source code.

Once the server is running, you should see a message indicating that the server is listening on the configured port.
