import * as store from "./store.js";
import * as webRTCHandler from "./webrtchandler.js";
import * as ui from "./ui.js";
import * as constants from "./constants.js";
import * as strangerUtils from'./strangerUtils.js';
let socketIO=null;
export const registerSocketEvents = (socket) => {
    socketIO=socket;
  socket.on("connect", () => {
     
    console.log("Connected Successfully to Server");
    store.setSocketId(socket.id);
    ui.updatePersonalCode(socket.id);
  });

  socket.on("pre-offer",(data)=>{
   
    webRTCHandler.handlePreOffer(data);
  })



   socket.on('pre-offer-answer',(data)=>{
        webRTCHandler.handlePreOfferAnswer(data);
   })


   socket.on('user-hanged-up',()=>{
      webRTCHandler.handleConnectedUserHangedUp();
      
   })

   socket.on('webRTC-signaling',(data)=>{
    switch(data.type){
      case constants.webRTCSignaling.OFFER:
        webRTCHandler.handleWebrTCoffer(data);
        break;

      case constants.webRTCSignaling.ANSWER:
        webRTCHandler.handleWebrTCAnswer(data);
        break;
         
      case constants.webRTCSignaling.ICE_CANDIDATE:
        webRTCHandler.handleWebRTCCandidate(data);
        break;


      default:
        return;
      }
    
   });

   socket.on('stranger-socket-id',(data)=>{
    strangerUtils.connectWithStranger(data);
      
   })





};


export const sendPreOffer=(data)=>{
   console.log("EMitting to server pre offer event");
    socketIO.emit("pre-offer",data);
    


}

export const sendPreOfferAnswer=(data)=>{
    socketIO.emit('pre-offer-answer',data);
}


export const sendDataUsingWebRTCSignaling=(data)=>{
  socketIO.emit('webRTC-signaling',data);

}


export const sendUserHangedUp=(data)=>{
   socketIO.emit('user-hanged-up',data);

}

export  const changeStrangerConnectionStatus=(data)=>{
  socketIO.emit('stranger-connection-status',data);

}

export const getStrangerSocketId=()=>{
  socketIO.emit('get-stranger-socket-id');
}
