// Keep the generated homepage and its copy generator on the same startup path.
function patchHeroEntrance(source) {
  if (source.includes('prepareHeroEntrance as __prepareHeroEntrance')) return source;
  const heroStart = source.indexOf('function at(');
  const effectStart = source.indexOf('[z,B]=o(!1);', heroStart);
  const effectEnd = source.indexOf('let V=z||A;', effectStart);
  if (heroStart < 0 || effectStart < 0 || effectEnd < 0) throw new Error('Hero entrance boundary missing');
  source = source.slice(0, effectStart) + '[z,B]=o(!1),__heroFrameReady=s(!1);h(()=>{if(!O||!P.current)return;return __prepareHeroEntrance(P.current,()=>__heroFrameReady.current,()=>B(!0))},[O]);' + source.slice(effectEnd);
  const changes = [
    ['style:Et(V,820)', 'style:Et(V,80)'],
    ['style:Et(V,980)', 'style:Et(V,120)'],
    ['R=et(O),[z,B]', '[z,B]'],
    ['if(!r)return;const __disposeSaturn=', 'if(!r)return;__heroFrameReady.current=!1;const __disposeSaturn='],
    ['f=Math.max(1,t.width),p=Math.max(1,t.height),e.width=Math.round(f*d),e.height=Math.round(p*d)', 'f=Math.max(1,t.width);p=Math.max(1,t.height);const width=Math.round(f*d),height=Math.round(p*d);if(e.width!==width||e.height!==height){e.width=width;e.height=height}'],
    [';m();let h=new ResizeObserver(m)', ';const __particleColors=Array.from({length:256},(_,i)=>`rgba(${u},${i/255})`),__particleHighlights=Array.from({length:256},(_,i)=>`rgba(255,255,255,${i/255})`);m();let h=new ResizeObserver(m)'],
    ['r.fillStyle=l[t]>.15||t%9==0?`rgba(255,255,255,${(R*.95).toFixed(3)})`:`rgba(${u},${R.toFixed(3)})`', 'r.fillStyle=l[t]>.15||t%9==0?__particleHighlights[Math.max(0,Math.min(255,Math.round(R*.95*255)))]:__particleColors[Math.max(0,Math.min(255,Math.round(R*255)))]'],
    ['r.globalCompositeOperation=`source-over`,n.style.setProperty(`--sc`', 'r.globalCompositeOperation=`source-over`,__heroFrameReady.current=!0,n.style.setProperty(`--sc`'],
    ['te(),__disposeSaturn(),', '__heroFrameReady.current=!1;te(),__disposeSaturn(),'],
    ['.fch-orb{position:absolute;', '.fch.is-entering .fc-hd-i{will-change:translate,opacity}\n.fch.is-entering .fch-orb{will-change:opacity}\n.fch-orb{position:absolute;'],
  ];
  for (const [before, after] of changes) {
    if (!source.includes(before)) throw new Error('Hero startup target missing: ' + before);
    source = source.replace(before, after);
  }
  return 'import {prepareHeroEntrance as __prepareHeroEntrance} from "/particle-shapes/hero-entrance.mjs?v=3";\n' + source;
}
module.exports = {patchHeroEntrance};
