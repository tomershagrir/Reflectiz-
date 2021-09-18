# Reflectiz Intelligenter Task
# REST API using Typescript

- mongodb / mongoose
- express / node
- redis-server

Requirement on running machine:
1) Have mongodb installed
2) Run redis server (for pub sub)
3) nodemon (recommended)

Installation:
> npm install
> npm run dev

Overview:
The app includes a rest api that processes user requests and depending on the request and the data stored in the database, sends it to
analysis by publishing a topic with the domain name at Redis Pub/Sub that performs as our message queue.
The app includes 4 services:
-Redis Publisher for sending analysis requests 
-VTService and WhoisService that use to get the external data regarding the anlysis for the analysis request for the domain.
-Scheduler that runs periodically verifies and updates the domain rows by sending analysis requests if needed.
note: repo also includes a diagram for the services architecture: architecture.bmp

Testing:
The app should run at localhost port 3000
*Note: VT Service uses Mock data

HTTP GET :
url: localhost:3000/api/domains?domain=www.google.com

HTTP POST :
url: localhost:3000/api/domains
body: {"domain": "www.google.com"}