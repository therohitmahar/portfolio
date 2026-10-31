/**
 * Framework-free SVG wordmark runtime. Kept self-contained so the exact function
 * can be included in both exports; glyph data is supplied separately.
 * @param {HTMLElement} host
 * @param {{first:string,second:string,duration:number,stagger:number,easing:string,firstColor:string,secondColor:string}} settings
 * @param {{glyphs:Record<string,{path:string,left:number,right:number,advance:number}>,rm?:{r:string,m:string,completion:string},original?:object}} alphabet
 */
export function createWordmark(host, settings, alphabet) {
  const ns = 'http://www.w3.org/2000/svg';
  const first = settings.first;
  const second = settings.second;
  if (!/^[a-z]{1,24}$/.test(first) || !/^[a-z]{1,24}$/.test(second)) throw Error('Use 1–24 lowercase letters per word.');
  const merged = first[0] === 'r' && second[0] === 'm';
  const id = 'wm-' + (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
  const glyph = c => alphabet.glyphs[c];
  const inkWidth = c => glyph(c).right - glyph(c).left;
  const element = (tag, attrs = {}) => {
    const el = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
    return el;
  };
  const layout = word => {
    const positions = [0];
    for (let i = 1; i < word.length; i++) positions.push(positions[i - 1] + glyph(word[i - 1]).advance);
    return positions;
  };
  let a = layout(first), b = layout(second);
  let firstX = merged ? 20 : 0;
  let secondX = firstX + a.at(-1) + inkWidth(first.at(-1)) + 197;
  if (first === 'rohit' && second === 'mahar') {
    a = [0, 400, 910, 1430, 1600];
    b = [0, 865, 1415, 1925, 2445];
    secondX = 2137;
  }
  const compactX = merged ? 98 : inkWidth(first[0]) + 80;
  const fullWidth = secondX + b.at(-1) + inkWidth(second.at(-1)) + 40;
  const compactWidth = merged ? 920 : compactX + inkWidth(second[0]) + 40;
  const svg = element('svg', {viewBox:`-20 -190 ${fullWidth + 20} 960`,role:'img','aria-label':`${first} ${second}`, 'data-wordmark-svg':''});
  Object.assign(svg.style,{width:'100%',height:'100%',display:'block',overflow:'visible'});
  const defs = element('defs'); svg.append(defs);
  const tracks = [];
  function pathFor(c) {
    return element('path',{d:glyph(c).path,transform:`translate(${-glyph(c).left} 0)`,'fill-rule':'evenodd'});
  }
  // Nested clips keep each successor behind its predecessor rather than fading.
  function tail(word, positions, index) {
    const parent = word[index - 1];
    const c = word[index];
    const edge = inkWidth(parent) - 12;
    const clipId = `${id}-${word === first ? 'a' : 'b'}-${index}-${tracks.length}`;
    const clip = element('clipPath',{id:clipId,clipPathUnits:'userSpaceOnUse'});
    clip.append(element('rect',{x:edge,y:-200,width:fullWidth+1000,height:1000}));defs.append(clip);
    const curtain = element('g',{'clip-path':`url(#${clipId})`});
    const group = element('g',{'data-letter':c});curtain.append(group);
    const open = positions[index] - positions[index - 1];
    const closed = edge - inkWidth(c) - 2;
    const order = word.length - 1 - index;
    tracks.push({group,open,closed,order});
    if (index + 1 < word.length) group.append(tail(word,positions,index+1));
    group.append(pathFor(c));
    return curtain;
  }
  const aGroup = element('g',{fill:settings.firstColor,transform:`translate(${firstX} 0)`});
  if(first.length>1) aGroup.append(tail(first,a,1));
  // The r is drawn again above the moving m to preserve the original overlap.
  if(!merged) aGroup.append(pathFor(first[0]));
  svg.append(aGroup);
  const bMove = element('g',{fill:settings.secondColor,'data-second-initial':''});
  if(second.length>1) bMove.append(tail(second,b,1));
  if(merged && alphabet.rm) {
    bMove.append(element('path',{d:alphabet.rm.m,transform:'translate(-98 0)'}));
    const clipId = id+'-arch';
    const clip=element('clipPath',{id:clipId,clipPathUnits:'userSpaceOnUse'});
    clip.append(element('rect',{x:450,y:-200,width:fullWidth+1000,height:1000}));defs.append(clip);
    const curtain=element('g',{'clip-path':`url(#${clipId})`,fill:settings.secondColor});
    const arch=element('g');
    arch.append(element('path',{d:alphabet.rm.completion,transform:'translate(-98 0)',stroke:settings.secondColor,'stroke-width':2}));
    curtain.append(arch);svg.append(curtain);svg.append(bMove);
    tracks.push({group:arch,initial:true});
    const anchor=element('g',{fill:settings.firstColor});anchor.append(element('path',{d:alphabet.rm.r}));svg.append(anchor);
  }else{bMove.append(pathFor(second[0]));svg.append(bMove);}
  tracks.push({group:bMove,initial:true});
  host.replaceChildren(svg);
  const maxOrder = Math.max(first.length,second.length)-2;
  const stagger = Math.min(settings.stagger, settings.duration * .65 / Math.max(1,maxOrder));
  const letterDuration = settings.duration - Math.max(0,maxOrder)*stagger;
  const curve = (settings.easing.match(/-?\d*\.?\d+/g)||[]).map(Number);
  const cp = curve.length===4 ? curve : [.45,0,.55,1];
  function ease(t) {
    if(t<=0)return 0;if(t>=1)return 1;
    let lo=0,hi=1,u=t;
    const bez=(v,p,q)=>3*(1-v)*(1-v)*v*p+3*(1-v)*v*v*q+v*v*v;
    for(let n=0;n<16;n++){u=(lo+hi)/2;if(bez(u,cp[0],cp[2])<t)lo=u;else hi=u;}
    return bez(u,cp[1],cp[3]);
  }
  let progress=0,playing=false,direction=1,speed=1,loop=false,frame=0,last=0,destroyed=false;
  const listeners=new Set();
  const state=()=>({progress,playing,direction,speed,loop,duration:settings.duration,merged});
  function render() {
    const time=progress*settings.duration;
    tracks.forEach(track=>{
      const value=track.initial
        ? secondX+(compactX-secondX)*ease(progress)
        : track.open+(track.closed-track.open)*ease(Math.max(0,Math.min(1,(time-track.order*stagger)/letterDuration)));
      track.group.setAttribute('transform',`translate(${value} 0)`);
    });
    host.dataset.progress=String(progress);host.dataset.merged=String(merged);
    host.dataset.compactWidth=String(compactWidth);host.dataset.fullWidth=String(fullWidth);
    listeners.forEach(fn=>fn(state()));
  }
  const pause=()=>{playing=false;cancelAnimationFrame(frame);render();};
  function tick(now){
    if(!playing||destroyed)return;
    if(now<last){frame=requestAnimationFrame(tick);return;}
    const delta=(now-last)*speed/settings.duration;last=now;
    progress=Math.max(0,Math.min(1,progress+delta*direction));
    if(progress===0||progress===1){if(loop){direction*=-1;last=now+450;}else playing=false;}
    render();
    if(playing)frame=requestAnimationFrame(tick);
  }
  const play=(nextDirection=direction)=>{
    if(destroyed)return;
    direction=nextDirection<0?-1:1;
    if((direction===1&&progress===1)||(direction===-1&&progress===0))progress=direction===1?0:1;
    if(playing){render();return;}
    playing=true;last=performance.now();frame=requestAnimationFrame(tick);render();
  };
  const seek=value=>{playing=false;cancelAnimationFrame(frame);progress=Math.max(0,Math.min(1,value));render();};
  const hidden=()=>{if(document.hidden)pause();};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const preference=()=>{if(reduced.matches)pause();};
  document.addEventListener('visibilitychange',hidden);reduced.addEventListener('change',preference);
  render();
  return {play,pause,seek,getState:state,
    setSpeed(value){speed=Math.max(.25,Math.min(2,value));},
    setLoop(value){loop=Boolean(value);},
    subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);},
    destroy(){destroyed=true;playing=false;cancelAnimationFrame(frame);listeners.clear();document.removeEventListener('visibilitychange',hidden);reduced.removeEventListener('change',preference);host.replaceChildren();}
  };
}
