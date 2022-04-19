# GitcoinDAO

## Install dependencies
### `yarn install`

#
## Tech
- Frontend: React
- Backend: Node, Fastify

#
## CONFIG:
```
The config for the deployment of the application includes the following which can be found in the sample.env:

## Backend required env(s):
- CONNECT_DB= mongodb url for the database connection on the backend side which is in server folder. 
- ORIGIN= origin for CORS configuration on the backend side.
- PORT= port for the api side connection

## Frontend required env(s):
- REACT_APP_SERVER_URL= api url for the frontend api connection

All this should be set in the .env file and must be set when deploying.
```

#
## General Deployemnt:

For the frontend, it depends on the nature of the deployment envirnoment running:

Run `npm run build` for static hosting and `npm run start:web` for server based hosting.
<br >

For the backend, a server is need to run the application and getting it deployed:

Run `npm run start` would set the server instance and get it running.


**note:** application would not run effectively if the ENVs ain't properly set.
#
# Backend - Node, Fastify

## Fastify
Fastify framework based backend api for NodeJs application

## Build/Run application:
### `npm start` (for production environment)
### `npm server:dev` (for development environment)

#
### **Application health status:**
* information about the application and its health status
```
GET /
```

## **Routes:**
```
POST /ticket to upload a html file and add ticket record 
GET /tickets to get all ticket records
GET /tickets/:id to get a ticket record
PUT /tickets/:id to post a comment to a ticket record 
DEL /tickets/:id to delete a ticket record.
```

**note:** :id is the mongodb _id (unique id) to fetch data


#
# Frontend - React
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start:web`

Runs the app in the development mode.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
