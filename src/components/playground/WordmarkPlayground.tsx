"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, ArrowLeftRight, Copy, Download, Link2, SlidersHorizontal, ChevronDown } from "lucide-react";
import ArrowIcon from "@/components/ArrowIcon";
import alphabet from "@/data/wordmark-alphabet.json";
import { createWordmark } from "@/lib/playground/runtime";
import { defaults, easings, readSettings, previewInk, type Settings } from "@/lib/playground/settings";
import { exportWordmark } from "@/lib/playground/export";
import { copyText } from "@/lib/playground/clipboard";

type Motion = ReturnType<typeof createWordmark>;
const letters = Object.entries(alphabet.glyphs);

export default function WordmarkPlayground() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [draft, setDraft] = useState({first:defaults.first, second:defaults.second});
  const [custom, setCustom] = useState(false);
  const [playback, setPlayback] = useState({playing:false,direction:1});
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [format, setFormat] = useState<"html" | "react">("react");
  const [feedback, setFeedback] = useState("");
  const preview = useRef<HTMLDivElement>(null);
  const navbarPreview = useRef<HTMLDivElement>(null);
  const motion = useRef<Motion | null>(null);
  const progress = useRef(0);
  const slider = useRef<HTMLInputElement>(null);
  const elapsed = useRef<HTMLOutputElement>(null);
  const previous = useRef({playing:false,direction:1});
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const valid = /^[a-z]{1,24}$/.test(draft.first) && /^[a-z]{1,24}$/.test(draft.second);
  const merged = settings.first[0] === "r" && settings.second[0] === "m";
  const code = exportWordmark(settings, format);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const hash = new URLSearchParams(location.hash.slice(1));
        if (!hash.has("s")) return;
        const restored = readSettings(JSON.parse(hash.get("s")!));
        setSettings(restored);setDraft({first:restored.first,second:restored.second});
        setCustom(restored.first!==defaults.first || restored.second!==defaults.second);
      } catch { setFeedback("This shared link could not be loaded. Showing the original settings."); }
    });
    return () => {cancelAnimationFrame(frame);clearTimeout(feedbackTimer.current);};
  }, []);

  useLayoutEffect(() => {
    if (!preview.current || !navbarPreview.current) return;
    const config = {...settings,easing:easings[settings.easing].value};
    const main = createWordmark(preview.current,config,alphabet);
    const small = createWordmark(navbarPreview.current,config,alphabet);
    motion.current=main;
    navbarPreview.current.style.width=`${Number(navbarPreview.current.dataset.fullWidth)*27/560}px`;
    const update = (state:ReturnType<Motion["getState"]>) => {
      progress.current=state.progress;
      if (slider.current) {slider.current.value=String(Math.round(state.progress*1000));slider.current.setAttribute("aria-valuetext",`${Math.round(state.progress*100)} percent tucked`);}
      if (elapsed.current) elapsed.current.value=`${(state.progress*state.duration/1000).toFixed(2)} / ${(state.duration/1000).toFixed(2)}s`;
      small.seek(state.progress);
      if(previous.current.playing!==state.playing || previous.current.direction!==state.direction){previous.current={playing:state.playing,direction:state.direction};setPlayback(previous.current);}
    };
    const unsubscribe = main.subscribe(update);
    main.seek(progress.current);
    return () => {unsubscribe();main.destroy();small.destroy();motion.current=null;};
  }, [settings]);
  useEffect(() => {motion.current?.setSpeed(speed);motion.current?.setLoop(loop);},[speed,loop,settings]);

  function change<K extends keyof Settings>(key:K,value:Settings[K]) {setSettings(current=>({...current,[key]:value}));}
  function text(key:"first"|"second",value:string) {
    value=value.toLowerCase();setDraft(current=>({...current,[key]:value}));
    if(/^[a-z]{1,24}$/.test(value)) change(key,value);
  }
  function selectExample(useCustom:boolean) {
    motion.current?.pause();setCustom(useCustom);
    if(!useCustom){setSettings(current=>({...current,first:defaults.first,second:defaults.second}));setDraft({first:defaults.first,second:defaults.second});}
  }
  function play() {const current=motion.current;if(!current)return;if(current.getState().playing)current.pause();else current.play(current.getState().direction);}
  function notify(message:string){clearTimeout(feedbackTimer.current);setFeedback(message);feedbackTimer.current=setTimeout(()=>setFeedback(""),4000);}
  async function copyCode(){notify(await copyText(code)?"Code copied.":"Copy unavailable. Select the code below or download the file.");}
  async function share(){const url=new URL(location.href);url.hash=new URLSearchParams({s:JSON.stringify(settings)}).toString();history.replaceState(null,"",url);notify(await copyText(url.href)?"Settings link copied.":"Your settings are in the address bar. Copy that link to share.");}
  function download(){const url=URL.createObjectURL(new Blob([code],{type:"text/plain;charset=utf-8"}));const link=document.createElement("a");link.href=url;link.download=format==="react"?"Wordmark.jsx":"wordmark.html";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function reset(){motion.current?.pause();progress.current=0;motion.current?.seek(0);setSettings({...defaults});setDraft({first:defaults.first,second:defaults.second});setCustom(false);setSpeed(1);setLoop(false);history.replaceState(null,"",location.pathname);notify("Original settings restored.");}

  return <div className="wordmark-lab">
    <header className="lab-heading">
      <div><h1><span>/</span>playground</h1></div>
      <p>A name, folded into its initials.<br/>Make it yours. Take the code.</p>
    </header>
    <div className="lab-workspace">
      <section className="lab-preview" aria-label="Animation preview">
        <div className="lab-example-switch" role="group" aria-label="Example">
          <button type="button" aria-pressed={!custom} onClick={()=>selectExample(false)}>RM original</button>
          <button type="button" aria-pressed={custom} onClick={()=>selectExample(true)}>Your name</button>
        </div>
        <div className="lab-canvas" style={{background:settings.background,color:previewInk(settings.background)}}>
          <div className="lab-canvas-caption"><span>{merged?"r + m · merged initials":`${settings.first[0]} + ${settings.second[0]} · separate initials`}</span><span>SVG lettering</span></div>
          <div className="lab-drawing" style={{width:`${settings.size}%`}} ref={preview}/>
          <div className="lab-canvas-foot"><span>Full name <span aria-hidden="true">→</span> initials</span><span>Drag the playhead below</span></div>
        </div>
        <div className="lab-player" aria-label="Playback controls">
          <div className="lab-player-top">
            <div className="lab-transport">
              <button type="button" className="lab-play" onClick={play} aria-label={playback.playing?"Pause animation":"Play animation"}>{playback.playing?<Pause/>:<Play/>}<span>{playback.playing?"Pause":"Play"}</span></button>
              <button type="button" className="lab-icon-button" aria-label="Replay animation" title="Replay" onClick={()=>{motion.current?.seek(0);motion.current?.play(1);}}><RotateCcw/></button>
              <button type="button" className="lab-icon-button" aria-label="Reverse animation" title="Reverse" onClick={()=>{const current=motion.current;if(current)current.play(-current.getState().direction);}}><ArrowLeftRight/></button>
            </div>
            <div className="lab-player-options"><label><span className="sr-only">Playback speed</span><select aria-label="Playback speed" value={speed} onChange={e=>setSpeed(Number(e.target.value))}>{[.25,.5,1,2].map(s=><option key={s} value={s}>{s}×</option>)}</select></label><label className="lab-check"><input type="checkbox" checked={loop} onChange={e=>setLoop(e.target.checked)}/>Loop</label></div>
          </div>
          <input className="lab-timeline" ref={slider} type="range" min="0" max="1000" step="1" defaultValue="0" aria-label="Animation progress" onChange={e=>motion.current?.seek(Number(e.target.value)/1000)}/>
          <div className="lab-timeline-labels"><span>Full name</span><output ref={elapsed}>0.00 / 1.00s</output><span>Initials</span></div>
        </div>
        <div className="lab-navbar-preview"><span>At navbar size</span><div className="lab-navbar-scroll" style={{background:settings.background}}><div ref={navbarPreview}/></div></div>
      </section>
      <aside className="lab-settings" aria-label="Wordmark settings">
        <details className="lab-settings-details" open><summary><span><SlidersHorizontal/>Make it yours</span><ChevronDown className="lab-details-symbol" aria-hidden="true"/></summary>
          <fieldset className="lab-fields"><legend>Name</legend>
            <label>First word<input value={draft.first} onChange={e=>text("first",e.target.value)} maxLength={24} disabled={!custom} autoComplete="off" spellCheck={false} aria-invalid={custom&&!/^[a-z]{1,24}$/.test(draft.first)} aria-describedby="lab-text-help"/></label>
            <label>Second word<input value={draft.second} onChange={e=>text("second",e.target.value)} maxLength={24} disabled={!custom} autoComplete="off" spellCheck={false} aria-invalid={custom&&!/^[a-z]{1,24}$/.test(draft.second)} aria-describedby="lab-text-help"/></label>
            <p id="lab-text-help" className={!valid?"lab-error":"lab-help"}>{!valid?"Use 1–24 letters a–z in each word. No spaces or numbers.":custom?"Lowercase a–z. Only r + m merges; other initials sit side by side.":"Choose ‘Your name’ to try a different pairing."}</p>
          </fieldset>
          <fieldset className="lab-fields"><legend>Motion</legend>
            <label className="lab-range-label" htmlFor="lab-duration">Duration <output>{(settings.duration/1000).toFixed(2)}s</output><input id="lab-duration" aria-label="Duration" type="range" min="300" max="3000" step="50" value={settings.duration} onChange={e=>change("duration",Number(e.target.value))}/></label>
            <label className="lab-range-label" htmlFor="lab-stagger">Letter stagger <output>{settings.stagger}ms</output><input id="lab-stagger" aria-label="Letter stagger" type="range" min="0" max="200" step="5" value={settings.stagger} onChange={e=>change("stagger",Number(e.target.value))}/></label>
            <label>Easing<select value={settings.easing} onChange={e=>change("easing",e.target.value as Settings["easing"])}>{Object.entries(easings).map(([key,easing])=><option key={key} value={key}>{easing.label}</option>)}</select></label>
            <p className="lab-help">Stagger scales down when needed to keep every letter within the duration.</p>
          </fieldset>
          <fieldset className="lab-fields"><legend>Appearance</legend>
            <div className="lab-colors">{([['firstColor','First word'],['secondColor','Second word'],['background','Background']] as const).map(([key,label])=><label key={key}><input type="color" value={settings[key]} onChange={e=>change(key,e.target.value)}/><span>{label}</span></label>)}</div>
            <label className="lab-range-label" htmlFor="lab-size">Preview size <output>{settings.size}%</output><input id="lab-size" aria-label="Preview size" type="range" min="40" max="100" step="1" value={settings.size} onChange={e=>change("size",Number(e.target.value))}/></label>
          </fieldset>
          <div className="lab-settings-actions"><button type="button" onClick={share} disabled={!valid}><Link2/>Share settings</button><button type="button" onClick={reset}>Reset</button></div>
        </details>
      </aside>
    </div>
    <section className="lab-export" aria-labelledby="lab-export-title">
      <div className="lab-section-heading"><div><h2 id="lab-export-title">Copy the animation.</h2></div><div className="lab-export-actions"><button type="button" className="lab-copy" disabled={!valid} onClick={copyCode}><Copy/>Copy code</button><button type="button" onClick={download} disabled={!valid}><Download/>Download</button></div></div>
      <div className="lab-export-tabs" role="group" aria-label="Code format"><button type="button" aria-pressed={format==="react"} onClick={()=>setFormat("react")}>React</button><button type="button" aria-pressed={format==="html"} onClick={()=>setFormat("html")}>HTML / CSS / JS</button></div>
      <p className="lab-export-instructions">{format==="react"?"Save as Wordmark.jsx and import it into your React app. No animation package required.":"Save as wordmark.html and open it in a browser, or move its styles and script into your page."} Only the letters in your name are included.</p>
      <details className="lab-code-details"><summary>View generated code <ChevronDown aria-hidden="true"/></summary><textarea aria-label="Generated code" readOnly value={code} spellCheck={false} wrap="off"/></details>
      <div className="lab-feedback" role="status">{feedback&&<span>{feedback}</span>}</div>
    </section>
    <section className="lab-alphabet" aria-labelledby="lab-alphabet-title"><div className="lab-section-heading"><div><h2 id="lab-alphabet-title">The lowercase set.</h2></div><a href="/playground/logo-study.html">Original experiments <ArrowIcon/></a></div><p className="lab-alphabet-description">The same stems, curves, and counters carry through the complete lowercase set. Each character is an SVG path, including in your export.</p><div className="lab-alphabet-grid">{letters.map(([letter,glyph])=><div key={letter} className="lab-glyph"><svg viewBox="-20 -190 960 960" role="img" aria-label={`Letter ${letter}`}><path fill="currentColor" fillRule="evenodd" d={glyph.path}/></svg><span>{letter}</span></div>)}</div></section>
  </div>;
}
