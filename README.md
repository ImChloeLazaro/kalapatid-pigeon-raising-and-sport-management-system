 # Pigeon Raising and Sport Management System


> Capstone Documentation: https://exe.io/bkx85cZa

### Reinstall System Dependencies

```sh
npm i
# or
npm install
```

### Running System in Development Mode
To install using node package manager: npm i -g nodemon
```sh
#run app and open web app in browser 
explorer http://localhost:9000 && nodemon app.js
# or
npm run dev
```

### Running System Locally via npm
```
npm start
```
### Running System Locally via heroku commandline
```sh
heroku local
#open in browser
heroku open
```

## Running System Deployed via tunnel
```sh
#localXpose
loclx tunnel http --to localhost:9000
#ngrok
ngrok http 9000
# stunel tunnel-client
st -p 9000
# localtunnel
lt -p 9000
```

## Running System in Docker
NOTE: the system docker repository is private you need to request permission,you need also to change database port in .env of system inside the docker container
```sh
# pull docker image in dockerhub
docker pull marcuwynu23/kalapatid
#run docker image and create a random image name
docker run -p 9000:9000 marcuwynu23/kalapatid
#open web application in default browser
explorer http://localhost:9000
```

## Guide References
#### Nunjucks View engine
- https://mozilla.github.io/nunjucks/

#### MongoDB
- https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc
- https://sqlserverguides.com/mongodb-join-two-collections/

### Web API
- https://developer.mozilla.org/en-US/docs/Web/API

#### Gmail API
- https://www.youtube.com/watch?v=-rcRf7yswfM
- https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9

#### Location,Map and Weather API 
- https://hibirdi.com/apis/api-integration-bing-maps-v8/tutorial/
- https://weatherstack.com/documentation


#### Localtunneling 
- https://www.npmjs.com/package/localxpose
- https://ngrok.com/docs/secure-tunnels#http-tunnels-local-https
- https://github.com/localtunnel/localtunnel/blob/master/README.md
"# kalapatid-pigeon-raising-and-sport-management-system" 
