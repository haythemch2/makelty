import socketIOClient from "socket.io-client";
import { 
    hashString, 
  } from 'react-hash-string'


function stackTrace ()
{
    const e = new Error()
    return hashString(e.stack)
}
export function init(ENDPOINT , token)
{
    if (!token || !ENDPOINT) return; 
    const doInit = (ENDPOINT , token)=>{
        window.realTimeClientSubscriptions = window.realTimeClientSubscriptions || {}
        window.realTimeClientoken = token
        let socket = socketIOClient.connect(ENDPOINT,{
            reconnection: true
        });
        window.realtimeClient = socket;
        socket.on('connect', function() {
           socket.emit("provideToken" , {token})
            Object.values(window.realTimeClientSubscriptions).forEach(sub=>{
                if (token==undefined)
                {
                    alert("token undefined")
                }
                socket.emit("subscribe" , {event : sub.event,filter : sub.filter , token})
              //  socket.on(sub.event  , sub.callback )
            }) 
            setInterval(
               ()=>{
                   console.log(window.realtimeClient.connected);
               }, 1000
            )
        });
        socket.on('disconnect',()=>{
        //    socket.removeAllListeners();
            console.log("disconnect");
        })
    }
    if (!window.realtimeClient)
    {
        doInit(ENDPOINT , token)
    }
    return window.realtimeClient;
}

export function subscribe(event,filter, callback ,addToList = true)
{
    console.log("subscribe")
    if (!window.realtimeClient )
    {
        console.log("no t not initialize");
        return; // throw
    }
    if ( !window.realtimeClient.connected)
    {
        console.log("not conncted");
        // retry after ms
        setTimeout(()=>{
       //     alert(window.realTimeClientoken)
            subscribe(event,filter, callback ,addToList )
        } , 200)
        return ;
    }
    const thisStack = stackTrace();
    console.log({addToList});
    if (addToList && window.realTimeClientSubscriptions[thisStack])
    {
        return;
    }
    const socket = window.realtimeClient;
  //  alert(window.realTimeClientoken)
    socket.emit("subscribe" , {event ,filter , token:window.realTimeClientoken})
    socket.on(event , callback)
    if (addToList) 
    {
        console.log("will add")
        window.realTimeClientSubscriptions = {...(window.realTimeClientSubscriptions || {}), [thisStack] :  {event,filter,callback} }
    }else{
        
        console.log("wont add")
    }
}

export function clean()
{
    if (window.realtimeClient)
    {
        window.realtimeClient.removeAllListeners();
        window.realtimeClient.disconnect();
        window.realtimeClient = null;
        window.realTimeClientSubscriptions = null
    }
}