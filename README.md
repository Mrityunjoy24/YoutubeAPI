# YoutubeAPI

steps to run the api

1. git clone the repo

2. go to the root folder the command -->  npm i   in the terminal

3. create an file callled .env at root folder which contains values
MONGO_URL= your mongodb url to connect
PORT= port number on which the app will run
YOUTUBE_API_KEY= youtube api key

4. create 2 indexes in mongodb
   a. db.videos.createIndex( { "publishTime" : -1, "_id" : -1 } ) // decreasing index based on publishtime and id
   b. db.videos.ensureIndex({ title: "text", description : "text"}); // full text index for search feature based on title and desciption

5. to run the api locally run the command -->    node server.js

Note: if you want to run the app in docker container follow the 1-4 steps above

4. install docker desktop

5. build the docker image using command -->  docker build . -t <username>/<app-name>

6. once the image is built run the docker container using command  
   docker run -p <dockerPort>:<hostPort> -d <username>/<app-name>
