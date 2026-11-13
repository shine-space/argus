
import {createOpeningRenderer} from './opening-renderer.mjs';
let renderer;
self.onmessage=({data})=>{
  if(data.type==='start'){
    try{renderer=createOpeningRenderer(data.canvas,data.geometry,data.viewport,message=>self.postMessage(message));}
    catch(error){self.postMessage({type:'error',message:error.message});}
  }else if(data.type==='resize')renderer?.resize(data.viewport);
  else if(data.type==='pause')renderer?.pause(data.paused);
  else if(data.type==='stop'){renderer?.dispose();self.close();}
};
