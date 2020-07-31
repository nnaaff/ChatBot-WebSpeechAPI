# ChatBot-WebSpeechAPI
A simple ChatBot built in Node.js using the Web Speech API and Google's NLP platform, Dialogflow.

## Modules to be installed:
- express
- apiai
- socket.io

Use `npm install <package_name>` to install the packages.

In *index.js*, insert your ***APIAI_TOKEN*** and ***APIAI_SESSION_ID*** which can be obtained by creating an account on the **Dialogflow** website and following the instructions in the documentation. Create a new agent, name it and customize its responses as per your liking under the *Small Talk* tab.

Run the application using `node index` to run the server locally and go to `localhost:5000`. Allow Google Chrome to access your microphone.
