const tmi = require('tmi.js');
const Say = require('say').Say
const say = new Say("win32")
const mineflayer = require('mineflayer');


// Minecraft bot options
const botOptions = {
  host: '172.25.48.1',
  port: 49196,
  username: 'Chat'
}


// Define configuration options
const options = {
  options: {
    debug: true
  },
  connection: {
      reconnect: true,
      secure: true
  },
  identity: {
    username: 'jugschatbot',
    password: 'oauth:jnd28d409i1ed5zfoskhqlj65y6pch'
  },
  channels: [
    'jugsomilk8'
  ]
};

const bot = mineflayer.createBot(botOptions);
const mcData = require('minecraft-data')('1.16.1')
// Create a client with our options
const client = new tmi.client(options);
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
// Connect to Twitch:
client.connect();
var speechQ = []
var speaking
bot.once('spawn', botConnected)
// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const message = msg.trim();
  const name = context.username;
  const fullMessage = name + " says " + message;
  if (message.startsWith('!help', 0)) {
    client.say("jugsomilk8", 'Command for spawning zombie or skeleton: !spawn <monster> <optional message>')
  }
  if (message.startsWith('!spawn', 0)) {
    if (message.includes("skeleton", 7)){
      let monster = message.slice(7, 16).trim()
      let chat = message.slice(16) || "die"
      spawnHandler(monster, chat)
    } else if (message.includes("zombie", 7)) {
      let monster = message.slice(7, 14).trim()
      let chat = message.slice(14) || 'die'
      spawnHandler(monster, chat)
    } else {
      client.say('jugsomilk8', "Valid Monsters are 'skeleton' and 'zombie'")
    } 
  }
  if (!message.startsWith('!', 0)) {
    speechQ.push(fullMessage);
    
    async function speak(phrase, TTSVoice, speed, callback) {
        console.log(speechQ);
        if (fullMessage.length >= 15 && fullMessage.length <= 35) {
          waitTime = 1000
        } else if (100 >= fullMessage.length && fullMessage.length >= 36) {
          waitTime = 3000
        } else {
          waitTime = 4000
        }
        function trySpeech() {    
          if (speaking === false) {
            say.speak(speechQ.slice(-1)[0], TTSVoice, speed, (err) => {
              speaking = true
              speechQ.pop();
              // if(callback) callback();
            });         
          } else {
              setTimeout(function(){
                  trySpeech();
                  speaking = false  
              }, waitTime);
          }
        }
        trySpeech();
    }

    speak(name + " says " + message, undefined, undefined, () => {
    }).then(() => {
      console.log("done");
    })
  }
  }
  let waitTime = 1000
  
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function botConnected () {
  bot.chat('/god Chat');
  bot.chat('Welcome to hell kiddo')
}

function spawnHandler (monster, message) {
  let currentLocation = {
      x: bot.players.Jugsomilk.entity.position.x,
      y: bot.players.Jugsomilk.entity.position.y,
      z: bot.players.Jugsomilk.entity.position.z
    }
  console.log(currentLocation);
  // bot.chat(message)
  // bot.chat(`/summon ${monster} ${currentLocation.x} ${currentLocation.y} ${currentLocation.z}`)
}