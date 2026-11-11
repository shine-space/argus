// Ball-and-stick silhouette: varied-size atoms and solid cylindrical bonds.
// Rendered by the existing hero particle shader, keeping its palette and motion.
const atoms = [
  [0, 0, -.10, .30],
  [.38, .80, -.20, .36],
  [-.65, .40, .12, .28],
  [-.94, -.43, .06, .19],
  [.76, -.62, .15, .23],
  [.20, -.91, -.05, .13],
  [1.10, -.13, .23, .16],
  [.69, .09, .36, .105],
  [.40, -.17, .38, .11]
];
const bonds = [[0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[4,5],[4,6],[4,7],[7,8],[8,0]];
const scale = .92;
const golden = Math.PI * (3 - Math.sqrt(5));
const cache = new Map();
const length = point => Math.hypot(...point);
const normalized = point => { const size = length(point); return point.map(value => value / size); };
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];

function buildPoints(count) {
  const surfaces = atoms.map(atom => ({kind: 'atom', atom, area: 4*Math.PI*atom[3]**2}));
  for (const [from, to] of bonds) {
    const a=atoms[from], b=atoms[to];
    const delta=b.slice(0,3).map((value,index)=>value-a[index]);
    const axis=normalized(delta), span=length(delta)-a[3]*.88-b[3]*.88, radius=.032;
    const start=a.slice(0,3).map((value,index)=>value+axis[index]*a[3]*.88);
    const u=normalized(cross(axis,Math.abs(axis[1])<.9?[0,1,0]:[1,0,0]));
    const v=cross(axis,u);
    surfaces.push({kind:'bond',start,axis,u,v,span,radius,area:2*Math.PI*radius*span});
  }
  const total=surfaces.reduce((sum,surface)=>sum+surface.area,0);
  const points=[];
  for (let part=0;part<surfaces.length;part++) {
    const surface=surfaces[part];
    const end=part===surfaces.length-1?count:Math.round(count*surfaces.slice(0,part+1).reduce((sum,item)=>sum+item.area,0)/total);
    const size=end-points.length;
    for (let index=0;index<size;index++) {
      const phi=index*golden;
      let point;
      if(surface.kind==='atom') {
        const [x,y,z,radius]=surface.atom;
        const latitude=1-2*(index+.5)/size, ring=Math.sqrt(1-latitude*latitude);
        point=[x+Math.cos(phi)*ring*radius,y+latitude*radius,z+Math.sin(phi)*ring*radius];
      } else {
        const progress=(index+.5)/size;
        point=surface.start.map((value,axis)=>value+surface.axis[axis]*surface.span*progress
          +surface.radius*(surface.u[axis]*Math.cos(phi)+surface.v[axis]*Math.sin(phi)));
      }
      points.push(point.map(value=>value*scale));
    }
  }
  return points;
}

export function moleculePoint(index,count) {
  if(!cache.has(count)) cache.set(count,buildPoints(count));
  return cache.get(count)[index];
}
