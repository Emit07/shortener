## Short-nr

This is a url shortener that runs on the bitly api. The shortner was made with node.js, this was not meant to be anything fancy it is just a super small project to learn about node. This project is released under the MIT license so feel free to modify and share. Please excuse the typos.

You can access this finished project at [http://short-nr.herokuapp.com/](http://short-nr.herokuapp.com/ "go to the url shortener").it is a little ironic having a big url for a link shortener

**Please remember I am using a free api key to show the concept so please do not spam links.**

## Running the app

#### Installing Dependencies

Install node.js and make sure that npm is working.

* [x] `node.js`

After you install node you will need to have the following installed using npm. 

`npm i express ejs node-fetch body-parser`.

* [x] `express`
* [x] `ejs`
* [x] `node-fetch`
* [x] `body-parser`

Also install nodemon using `npm install nodemon --save-dev`.

* [x] `nodemon`

You will also need an api key to shorten the urls. By default it is using the [bitly api](https://dev.bitly.com/ "bitly api"), you can find a plan [here](https://bitly.com/pages/pricing/v1?utm_content=pricing&utm_source=organic&utm_medium=dev-site&utm_campaign=website&utm_cta=web2-blank-pricing-dev-site-getstarted-getenterprise-getenterprise "get a plan").

After you get an api key, you can either set the environment variable or hardcode it into the script if you are not planning to share.

#### Running the Server

Once you install the dependencies you can run the application using 
`npm run devstart`

#### Accessing the Page

Unless you are running this remotely the default port will be 5000
you can connect to the default server by going to localhost:5000,
you can always change the port of the server if it interferes.