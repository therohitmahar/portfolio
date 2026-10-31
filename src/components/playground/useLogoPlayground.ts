"use client";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

type Countdown = {kind:"hold"|"taps";seconds:number}|null;
export default function useLogoPlayground() {
  const router=useRouter();const pathname=usePathname();
  const [countdown,setCountdown]=useState<Countdown>(null);
  const clock=useRef<ReturnType<typeof setInterval>|undefined>(undefined);
  const press=useRef<{x:number;y:number}|null>(null);
  const taps=useRef<number[]>([]);
  const lastPointer=useRef("");
  const blockClick=useRef(false);
  const active=useRef<Countdown>(null);
  const cancel=useCallback(()=>{clearInterval(clock.current);press.current=null;taps.current=[];active.current=null;setCountdown(null);},[]);
  function open(){clearInterval(clock.current);press.current=null;taps.current=[];active.current=null;setCountdown(null);router.push("/playground");}
  function start(kind:"hold"|"taps",milliseconds:number){
    clearInterval(clock.current);const end=Date.now()+milliseconds;
    active.current={kind,seconds:milliseconds/1000};setCountdown(active.current);
    clock.current=setInterval(()=>{
      const remaining=end-Date.now();
      if(remaining<=0){if(kind==="hold")blockClick.current=true;open();}
      else {const next={kind,seconds:Math.ceil(remaining/1000)};if(next.seconds!==active.current?.seconds){active.current=next;setCountdown(next);}}
    },80);
  }
  useEffect(()=>{
    const stop=()=>{clearInterval(clock.current);press.current=null;taps.current=[];active.current=null;setCountdown(null);};
    const hidden=()=>{if(document.hidden)stop();};
    const escape=(event:globalThis.KeyboardEvent)=>{if(event.key==="Escape")stop();};
    document.addEventListener("visibilitychange",hidden);document.addEventListener("keydown",escape);window.addEventListener("scroll",stop,{passive:true});window.addEventListener("blur",stop);
    return()=>{clearInterval(clock.current);document.removeEventListener("visibilitychange",hidden);document.removeEventListener("keydown",escape);window.removeEventListener("scroll",stop);window.removeEventListener("blur",stop);};
  },[]);
  useEffect(()=>{const frame=requestAnimationFrame(cancel);return()=>cancelAnimationFrame(frame);},[pathname,cancel]);
  return {countdown,cancel,props:{
    title:"Home · hold 4 seconds for the playground",
    "aria-describedby":"logo-playground-help",
    onPointerDown(event:PointerEvent<HTMLAnchorElement>){
      lastPointer.current=event.pointerType;
      if(pathname==="/playground"||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      if(event.pointerType!=="touch"){press.current={x:event.clientX,y:event.clientY};blockClick.current=false;start("hold",4000);}
    },
    onPointerMove(event:PointerEvent<HTMLAnchorElement>){const p=press.current;if(p&&Math.hypot(event.clientX-p.x,event.clientY-p.y)>10)cancel();},
    onPointerUp(){if(active.current?.kind==="hold")cancel();},
    onPointerLeave(){if(active.current?.kind==="hold")cancel();},
    onPointerCancel:cancel,
    onContextMenu(event:MouseEvent<HTMLAnchorElement>){if(active.current?.kind==="hold"||blockClick.current)event.preventDefault();},
    onKeyDown(event:KeyboardEvent<HTMLAnchorElement>){if(event.key==="Enter"&&event.shiftKey){event.preventDefault();cancel();open();}},
    onClick(event:MouseEvent<HTMLAnchorElement>){
      if(blockClick.current){blockClick.current=false;event.preventDefault();return true;}
      if(active.current?.kind==="taps"){event.preventDefault();return true;}
      if(pathname!=="/playground"&&lastPointer.current==="touch"&&event.detail>0){
        const now=Date.now();taps.current=taps.current.filter(time=>now-time<=30000);taps.current.push(now);
        if(taps.current.length>=7){event.preventDefault();start("taps",3000);return true;}
      }
      return false;
    },
  }};
}
