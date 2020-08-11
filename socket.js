const io = require('socket.io-client');
const player = require('play-sound')(opts = {player: './mplayer-svn-38117/mplayer.exe'})
require('dotenv').config()


const secret = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjI2RjUwODVDMzg3RDJDMzgwQTAxIiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiMTY0MzIzMzgwIn0.Yd4LWt6dy0Xxo1GwEOBoxE0xSLXsbiYBS1LiS5I_vrU'

const streamlabs = io(`https://sockets.streamlabs.com?token=${secret}`, {transports: ['websocket']});




streamlabs.on('connect', () => {
  console.log("Connected");
})



streamlabs.on('event', eventData => {
  
  // if (!eventData.for && eventData.type === 'donation') {
  //   //code to handle donation events
  //   console.log(eventData.message);
  // }
  if (eventData.for === 'twitch_account') {
    switch(eventData.type) {
      case 'donation':
        console.log(eventData.message);
      case 'follow':
        //code to handle follow events
        player.play('annoying-siren.mp3', function(err){
          if (err) throw err
        })
        console.log(eventData.message);
        break;
      case 'subscription':
        //code to handle subscription events
        console.log(eventData.message);
        break;
      case 'chat':
        console.log(eventData.message);
      default:
        //default case
        console.log(eventData.message);
    }
  }
})