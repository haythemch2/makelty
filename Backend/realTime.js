const socket = require('socket.io')

let realTimeClientsMap = {clientById : {} , clientIdByToken : {}}
let eventsToToken = {}
let clientById =  {}

const filterMatch =  (filter1 , filter2)=>{
    console.log({filter1})
    console.log({filter2})
    return JSON.stringify(filter1) == JSON.stringify(filter2);
}
function Init(http)
{
    var io = socket(http, {
        cors: {
         origin: "http://localhost:3000",
         methods: ["GET", "POST"]
       },'pingTimeout': 7000, 'pingInterval': 3000});
     
     io.on('connection',client  => {
       const clientId  = client.id
       console.log({clientId});
       clientById[clientId] = client

       
       client.on("provideToken" , ({token}) =>{
         console.log({token});
       realTimeClientsMap.clientById[clientId] = {
         token
       }
       realTimeClientsMap.clientIdByToken[token] = {
         clientId
       }
       console.log({"provideToken" : true});
       console.log({realTimeClientsMap});
       })
       client.on("subscribe" , ({event , token,filter})=>{
         console.log("sbscribe : " , event , " token : " + token);
         let subscribedTokens = eventsToToken[event] || []
         if (token===undefined)
         {
           throw Error("undefined token")
         }
         eventsToToken[event] = { ...subscribedTokens , [token] : {filter}}
         console.log({"eventsToToken[event] " : eventsToToken[event] });
       })
      
     })
}

const emitEvent  = (event ,eventFilter, data)=>{
    try{
    console.log("emitting event " , event);
    const tokens = Object.keys(eventsToToken[event] || {})
    console.log({tokens});
    tokens.forEach(t => {
      const extractedId = realTimeClientsMap.clientIdByToken[t].clientId
      const mapedClient = clientById[extractedId]
      const listenerFilter = eventsToToken[event][t].filter;
      if (mapedClient.connected == false)
      {
        console.log("client disconnected : " + t);
      }else{
        console.log("client connected  : " + t);
      }
      if (true || filterMatch(listenerFilter  , eventFilter))
      {
          mapedClient.emit(event ,data)
      }
    })
  } catch(e){
    console.log({e});
  }
  }

module.exports = {Init,emitEvent}