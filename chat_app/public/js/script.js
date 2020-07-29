'use strict';

const socket = io();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecog = new SpeechRecognition();

speechRecog.lang = 'en-GB';
speechRecog.interimResults = false;
speechRecog.maxAlternatives = 1;

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');
const button = document.querySelector('button');


button.onclick = () => {
	speechRecog.start();
} ;

speechRecog.onspeechstart = () => {
	console.log('Speech detected...');
};

speechRecog.onresult = (event) => {
	console.log('Bot response detected...');

	const last = event.results.length - 1;
	const text = event.results[last][0].transcript;
	outputYou.textContent = text;
	console.log(`\nConfidence: ${event.results[0][0].confidence}.`);

	// socket.io functionality
	socket.emit('user message', text);
};

speechRecog.onspeechend = () => {
	speechRecog.stop();
};

speechRecog.onerror = (event) => {
	console.log(`An error occurred! ${event.error}`);
};


function speechSynth(text) {
	const synth = window.speechSynthesis;
	const utterance = new speechSynthesisUtterance();
	utterance.text = text;
	synth.speak(utterance);
}

socket.on('bot reply', (botReply) => {
	speechSynth(botReply);
	if(botReply == '')
		botReply = '(No reply...)';
	outputBot.textContent = botReply;
} )




