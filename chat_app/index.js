const APIAI_SESSION_ID = '';
const APIAI_TOKEN = '';
const apiai = require('apiai')(APIAI_TOKEN);

const express = require('express');
const app = new express();
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


const server = app.listen(5000, () => {
	console.log(`\nExpress server now listening on Port: ${server.address().port}...`);
} );

const io = require('socket.io') (server);

io.on('connection', (socket) => {
	console.log("User has joined the chat.");
} );

app.get('/', (req, res) => {
	res.sendFile('index.html');
} );


io.on('connection', (socket) => {

	socket.on('user message', (text) => {
		console.log(`\nMessage from User: ${text}`);

		// sending the Request (User's message) to API.AI
	    let req_Apiai = apiai.textRequest(text, { sessionId: APIAI_SESSION_ID } );

	    // receiving a Response (ChatBot's reply) from API.AI 
	    req_Apiai.on('response', (response) => {
	    	let Apiai_resp = response.result.fulfillment.speech;
	      	console.log(`Reply from Bot: ${Apiai_resp}`);
	      	socket.emit('bot reply', Apiai_resp);
	    } );

    	req_Apiai.on('error', (error) => {
      		console.log(error);
    	} );

    	req_Apiai.end();
  	} );

} );




