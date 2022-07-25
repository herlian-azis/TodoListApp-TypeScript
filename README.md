# TodoListApp-Typescript

React Native Todo List App With ngrok 

## Getting Started

Clone repo 

### Prerequisites
Already installed ngrok (https://ngrok.com/)

### Installing

     npm install
 
## Running 
need 3 command line to start this project


cd/JsonServer run JsonServer

    npm start db //to start database server
   
run ngrok cmd

    ngrok http 3000 //to start ngrok tunnel
 
then copy ngrok tunnel forwarding url and past in config/APIAccesss.config.ts

     // update this BaseURL -> "<new_ngrok_host_url>" Dynamic
     const baseURL = "https://9c08-103-82-15-72.ap.ngrok.io";

run expo

    expo start
    
run emulator android or ios

## Authors

  - **Herlian Abdul Aziz** - *Mobile Devepeloper* 
 
