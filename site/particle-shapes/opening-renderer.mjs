
const clamp = value => Math.min(1, Math.max(0, value));
// Zero velocity and acceleration at both ends of the gathering motion.
const smooth = value => { const x = clamp(value); return x*x*x*(x*(x*6-15)+10); };
export function createOpeningRenderer(canvas, geometry, viewport, notify) {
  const ctx = canvas.getContext('2d', {alpha:true});
  if (!ctx) throw new Error('Opening canvas unavailable');
  let width,height,ratio,cx,cy,layers,background;
  let frame=0,elapsed=0,previous=null,paused=false,disposed=false,phase='';
  const resize = size => {
    width=size.width;height=size.height;ratio=Math.min(size.ratio,1.5);cx=width/2;cy=height/2;
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    const small=width<810, markHeight=Math.min(width*(small?.2:.14),height*.26,220);
    const markWidth=markHeight*geometry.aspect;
    layers=[[],[],[]];
    for(let source=0,i=0;source<geometry.points.length;source+=small?2:1,i++) {
      const point=geometry.points[source],angle=i*2.399963;
      const radius=Math.min(width,height)*(.12+((i*137)%997)/997*.32);
      layers[i%19===0?2:geometry.edges[source]?1:0].push({
        x:(point[0]-.5)*markWidth,y:(point[1]-.5)*markHeight,
        sx:Math.cos(angle)*radius,sy:Math.sin(angle)*radius,
        size:(small?.65:.9)+(i%5)*.1,delay:(i%17)/17*60
      });
    }
    background=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.hypot(cx,cy));
    background.addColorStop(0,'#101b14');background.addColorStop(.7,'#07100c');background.addColorStop(1,'#07100c');
  };
  const paint = time => {
    frame=0;if(disposed||paused)return;
    // Never skip a choreography phase to catch up with a delayed frame.
    if(previous!==null)elapsed+=Math.min(40,Math.max(0,time-previous));previous=time;
    ctx.setTransform(ratio,0,0,ratio,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    ctx.clearRect(0,0,width,height);ctx.fillStyle=background;ctx.fillRect(0,0,width,height);
    const leaving=smooth((elapsed-1160)/400), contraction=1-leaving;
    const opacity=(.08+.92*smooth(elapsed/180))*(1-leaving**3);
    for(let layer=0;layer<3;layer++) {
      ctx.beginPath();ctx.fillStyle=['#f36747','#ff895f','#f4f2eb'][layer];ctx.globalAlpha=(layer===0?.72:.94)*opacity;
      for(const p of layers[layer]) {
        const assembled=smooth((elapsed-p.delay)/900),orbit=.2*(1-assembled);
        const sx=p.sx*Math.cos(orbit)-p.sy*Math.sin(orbit),sy=p.sx*Math.sin(orbit)+p.sy*Math.cos(orbit);
        const x=cx+(sx+(p.x-sx)*assembled)*contraction,y=cy+(sy+(p.y-sy)*assembled)*contraction;
        const size=p.size*Math.max(.25,contraction);
        ctx.moveTo(x+size,y);ctx.arc(x,y,size,0,Math.PI*2);
      }
      ctx.fill();
    }
    ctx.globalAlpha=1;
    const next=elapsed<960?'assemble':elapsed<1160?'word':elapsed<1560?'core':'reveal';
    if(phase!==next){phase=next;notify({type:'phase',phase,elapsed});}
    // Draw the expanding transparent hole here, without main-thread CSS masks.
    if(elapsed>=1560){
      const progress=1-(1-clamp((elapsed-1560)/400))**3;
      ctx.globalCompositeOperation='destination-out';ctx.beginPath();
      ctx.arc(cx,cy,progress*Math.hypot(cx,cy)*1.02,0,Math.PI*2);ctx.fill();
    }
    if(elapsed>=1960){disposed=true;notify({type:'done',elapsed});return;}
    frame=requestAnimationFrame(paint);
  };
  // Commit the scattered field before spending any of the gathering timeline.
  // The host acknowledges two presentation frames, then resumes this clock.
  resize(viewport);paint(0);cancelAnimationFrame(frame);frame=0;paused=true;previous=null;
  notify({type:'ready'});
  return {
    resize,
    pause(value){paused=value;previous=null;cancelAnimationFrame(frame);frame=0;if(!paused&&!disposed)frame=requestAnimationFrame(paint);},
    dispose(){disposed=true;cancelAnimationFrame(frame);}
  };
}
