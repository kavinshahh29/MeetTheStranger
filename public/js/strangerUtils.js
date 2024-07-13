


import * as ui from "./ui.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webrtchandler.js";
let strangerCallType;
export const changeStrangerConnectionStatus=(status)=>{
    const data={status};
    wss.changeStrangerConnectionStatus(data);

} 


export const getStrangerSocketIdAndConnect=(type)=>{
   strangerCallType=type;
    wss.getStrangerSocketId();
}


export const  connectWithStranger=(data)=>{
    console.log(data.randomStrangerSocketId);
    // console.log("JJJJ");
  if(data.randomStrangerSocketId){
    webRTCHandler.sendPreOffer(strangerCallType,data.randomStrangerSocketId);

  }
  else
  {
    ui.showNoStrangerAvailableDialog();
     // no user available 


  }

}