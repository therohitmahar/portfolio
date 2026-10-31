import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import webpackModule from 'next/dist/compiled/webpack/webpack.js';
import runtime from './playwright-runtime.cjs';

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:3014';
const output = path.resolve('output/review/playground');
fs.mkdirSync(output,{recursive:true});
const browser = await runtime.loadPlaywright().chromium.connectOverCDP('http://127.0.0.1:9222');
const report=[];
let htmlCode, reactCode, previewPose;
const progress = p => p.locator('.lab-drawing').evaluate(e=>Number(e.dataset.progress));
const pose = p => p.locator('.lab-drawing svg').evaluate(svg=>[...svg.querySelectorAll('g[data-letter],g[data-second-initial]')].map(e=>e.getAttribute('transform')));
async function context(width,theme,touch,reduced='no-preference') {
  const c=await browser.newContext({viewport:{width,height:1000},colorScheme:theme,hasTouch:touch,isMobile:touch,reducedMotion:reduced});
  const p=await c.newPage();await p.bringToFront();
  const cd=await c.newCDPSession(p);
  await cd.send('Emulation.setTouchEmulationEnabled',{enabled:touch,maxTouchPoints:1});
  await cd.send('Emulation.setEmitTouchEventsForMouse',{enabled:touch,configuration:touch?'mobile':'desktop'});
  return {c,p};
}
try {
 for(const [width,theme,touch] of [[1440,'light',false],[900,'dark',false],[390,'dark',true],[320,'light',true]]) {
  const {c,p}=await context(width,theme,touch);
  try {
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto(base+'/playground');await p.waitForSelector('.lab-drawing svg');
   const timeline=p.getByRole('slider',{name:'Animation progress',exact:true});
   assert.equal(await progress(p),0);assert.equal(await p.locator('.lab-drawing').getAttribute('data-merged'),'true');
   assert.equal(await p.locator('.lab-glyph').count(),26);
   assert.ok(await p.locator('.lab-glyph svg path').evaluateAll(paths=>paths.every(path=>{const b=path.getBBox();return b.width>0&&b.height>0;})));
   await timeline.fill('500');const middle=await pose(p);await p.waitForTimeout(120);assert.equal(await progress(p),.5);assert.deepEqual(await pose(p),middle);
   await timeline.fill('1000');assert.equal(await progress(p),1);
   const rm=await p.locator('.lab-drawing svg path').evaluateAll(paths=>paths.map(path=>path.getAttribute('d')));
   const original=JSON.parse(fs.readFileSync('src/data/brand-glyphs.json','utf8'));
   assert.ok(rm.includes(original.paths.r)&&rm.includes(original.paths.m));
   await timeline.focus();await p.keyboard.press('Home');assert.equal(await progress(p),0);await p.keyboard.press('End');assert.equal(await progress(p),1);
   await p.getByRole('button',{name:'Your name',exact:true})[touch?'tap':'click']();
   await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).fill('Alice');await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'Second word',exact:true}).fill('zhang');
   assert.equal(await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).inputValue(),'alice');
   assert.equal(await p.locator('.lab-drawing').getAttribute('data-merged'),'false');
   await timeline.fill('450');await p.getByRole('slider',{name:/Duration/}).fill('1500');assert.equal(await progress(p),.45);
   await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).fill('a1');assert.equal(await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).getAttribute('aria-invalid'),'true');assert.ok(await p.getByRole('button',{name:'Copy code',exact:true}).isDisabled());
   await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).fill('abcdefghijklm');await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'Second word',exact:true}).fill('nopqrstuvwxyz');
   assert.equal(await p.locator('.lab-drawing svg path').count(),26);
   await timeline.fill('1000');assert.equal(await p.locator('.lab-drawing').getAttribute('data-merged'),'false');
   await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).fill('i');await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'Second word',exact:true}).fill('w');await timeline.fill('500');assert.equal(await progress(p),.5);
   await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).fill('ravi');await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'Second word',exact:true}).fill('mehta');assert.equal(await p.locator('.lab-drawing').getAttribute('data-merged'),'true');
   await p.getByRole('slider',{name:/Duration/}).fill('3000');await timeline.fill('200');
   await p.getByRole('button',{name:'Play animation',exact:true})[touch?'tap':'click']();await p.waitForTimeout(180);await p.getByRole('button',{name:'Pause animation',exact:true})[touch?'tap':'click']();
   const paused=await progress(p);assert.ok(paused>.2&&paused<1);await p.waitForTimeout(150);assert.equal(await progress(p),paused);
   await p.getByRole('button',{name:'Reverse animation',exact:true})[touch?'tap':'click']();await p.waitForTimeout(100);await p.getByRole('button',{name:'Pause animation',exact:true})[touch?'tap':'click']();assert.ok(await progress(p)<paused);
   await p.getByRole('button',{name:'Share settings',exact:true})[touch?'tap':'click']();assert.ok(new URL(p.url()).hash.includes('s='));
   const shared=await c.newPage();await shared.goto(p.url());await shared.waitForFunction(()=>document.querySelector('.lab-drawing svg')?.getAttribute('aria-label')==='ravi mehta');assert.equal(await shared.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).inputValue(),'ravi');await shared.close();await p.bringToFront();
   if(width===1440){
    await timeline.fill('500');previewPose=await pose(p);
    reactCode=await p.getByLabel('Generated code',{exact:true}).inputValue();
    await p.getByRole('button',{name:'HTML / CSS / JS',exact:true})[touch?'tap':'click']();htmlCode=await p.getByLabel('Generated code',{exact:true}).inputValue();
    // Denied clipboard must retain a usable download and visible recovery text.
    await p.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(Error('denied'))}});document.execCommand=()=>false;});
    await p.getByRole('button',{name:'Copy code',exact:true})[touch?'tap':'click']();assert.match(await p.locator('.lab-feedback').innerText(),/Copy unavailable/);
    const downloadEvent=p.waitForEvent('download');await p.getByRole('button',{name:'Download',exact:true})[touch?'tap':'click']();assert.equal((await downloadEvent).suggestedFilename(),'wordmark.html');
    await p.getByRole('slider',{name:/Duration/}).fill('300');await p.getByRole('combobox',{name:'Playback speed',exact:true}).selectOption('2');await p.getByLabel('Loop',{exact:true}).check();await timeline.fill('0');await p.getByRole('button',{name:'Play animation',exact:true})[touch?'tap':'click']();await p.waitForTimeout(850);assert.ok(await p.getByRole('button',{name:'Pause animation',exact:true}).isVisible());assert.ok(await progress(p)>=0&&await progress(p)<=1);await p.getByRole('button',{name:'Pause animation',exact:true})[touch?'tap':'click']();
   }
   await p.getByRole('button',{name:'Reset',exact:true})[touch?'tap':'click']();assert.equal(await progress(p),0);assert.equal(await p.getByRole('group',{name:'Name',exact:true}).getByRole('textbox',{name:'First word',exact:true}).inputValue(),'rohit');
   await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(100);
   await p.screenshot({path:path.join(output,`viewport-${width}-${theme}.png`)});
   await p.screenshot({path:path.join(output,`final-${width}-${theme}.png`),fullPage:true});
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
   report.push({viewport:width,theme,touch,editor:'passed'});console.log('PASS EDITOR',width,theme);
  }finally{await c.close().catch(()=>{});}
 }
 // Run the actual copied HTML without the application, its CSS, or its modules.
 {
  const {c,p}=await context(1000,'light',false);try{
   const errors=[];p.on('pageerror',e=>errors.push(e.message));fs.writeFileSync(path.join(output,'exported-wordmark.html'),htmlCode);
   await p.setContent(htmlCode);await p.waitForSelector('[data-wordmark-svg]');
   await p.evaluate(()=>motion.seek(.5));
   const actual=await p.locator('svg').evaluate(svg=>[...svg.querySelectorAll('g[data-letter],g[data-second-initial]')].map(e=>e.getAttribute('transform')));
   assert.deepEqual(actual,previewPose);await p.getByRole('button',{name:'Tuck name',exact:true}).click();await p.waitForTimeout(150);await p.getByRole('button',{name:'Pause',exact:true}).click();assert.deepEqual(errors,[]);report.push({export:'html',standalone:true,midpointMatches:true});console.log('PASS HTML EXPORT');
  }finally{await c.close().catch(()=>{});}
 }
 // Compile the copied React component and mount two real instances in isolation.
 {
  const component=ts.transpileModule(reactCode,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}});
  fs.writeFileSync(path.join(output,'Wordmark.mjs'),component.outputText);
  fs.writeFileSync(path.join(output,'react-entry.mjs'),`import React from 'react';import {createRoot} from 'react-dom/client';import Wordmark from './Wordmark.mjs';createRoot(document.getElementById('root')).render(React.createElement(React.Fragment,null,React.createElement(Wordmark),React.createElement(Wordmark)));`);
  await new Promise((resolve,reject)=>webpackModule.webpack({mode:'development',devtool:false,optimization:{minimize:false},entry:path.join(output,'react-entry.mjs'),output:{path:output,filename:'react-export-bundle.js'},resolve:{modules:[path.resolve('node_modules'),'node_modules']}},(error,stats)=>error?reject(error):stats.hasErrors()?reject(Error(stats.toString({all:false,errors:true}))):resolve()));
  const {c,p}=await context(1000,'light',false);try{
   const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.setContent('<div id="root"></div>');await p.addScriptTag({content:fs.readFileSync(path.join(output,'react-export-bundle.js'),'utf8')});await p.waitForFunction(()=>document.querySelectorAll('[data-wordmark-svg]').length===2);
   const ids=await p.locator('clipPath').evaluateAll(nodes=>nodes.map(n=>n.id));assert.equal(new Set(ids).size,ids.length);
   await p.getByRole('button',{name:'Tuck name',exact:true}).first().click();await p.waitForTimeout(100);await p.getByRole('button',{name:'Pause',exact:true}).first().click();assert.ok(Number(await p.locator('[data-progress]').first().getAttribute('data-progress'))>0);assert.equal(await p.locator('[data-progress]').nth(1).getAttribute('data-progress'),'0');assert.deepEqual(errors,[]);report.push({export:'react',standalone:true,multipleInstances:true});console.log('PASS REACT EXPORT');
  }finally{await c.close().catch(()=>{});}
 }
 // Easter-egg interaction contracts, including a gap longer than the rejected 8s window.
 {
  const {c,p}=await context(1440,'light',false);try{
   await p.goto(base+'/');const logo=p.locator('.site-header .identity');await logo.hover();await p.waitForTimeout(650);assert.ok((await p.locator('.brand-logo').boundingBox()).width>200);
   await p.mouse.down();await p.waitForTimeout(1150);assert.match(await p.locator('.logo-countdown').innerText(),/3s/);await p.mouse.up();assert.equal(await p.locator('.logo-countdown').count(),0);assert.equal(new URL(p.url()).pathname,'/');
   await logo.hover();await p.mouse.down();await p.waitForURL('**/playground',{timeout:6000});await p.mouse.up();await p.waitForTimeout(150);assert.equal(new URL(p.url()).pathname,'/playground');
   await p.goto(base+'/');await logo.focus();await p.keyboard.press('Shift+Enter');await p.waitForURL('**/playground');report.push({easterEgg:'desktop',cancel:true,hold:true,keyboard:true});console.log('PASS DESKTOP EASTER EGG');
  }finally{await c.close().catch(()=>{});}
 }
 {
  const {c,p}=await context(390,'dark',true);try{
   await p.goto(base+'/');await p.waitForTimeout(650);const logo=p.locator('.site-header .identity');
   for(let i=0;i<3;i++)await logo.tap();await p.waitForTimeout(9000);for(let i=0;i<4;i++)await logo.tap();await p.waitForSelector('.logo-countdown');assert.match(await p.locator('.logo-countdown').innerText(),/Playground in/);
   await p.getByRole('button',{name:'Cancel',exact:true}).tap();await p.waitForTimeout(3200);assert.equal(new URL(p.url()).pathname,'/');
   for(let i=0;i<7;i++)await logo.tap();await p.waitForURL('**/playground',{timeout:5000});report.push({easterEgg:'mobile',gapOverEightSeconds:true,cancel:true,seventhTap:true});console.log('PASS MOBILE EASTER EGG');
  }finally{await c.close().catch(()=>{});}
 }
 {
  const {c,p}=await context(390,'dark',true,'reduce');try{await p.goto(base+'/playground');await p.waitForSelector('.lab-drawing svg');assert.equal(await progress(p),0);await p.waitForTimeout(250);assert.equal(await progress(p),0);await p.getByRole('slider',{name:'Animation progress',exact:true}).fill('500');assert.equal(await progress(p),.5);report.push({reducedMotion:'passed'});console.log('PASS REDUCED MOTION');}finally{await c.close().catch(()=>{});}
 }
 fs.writeFileSync(path.join(output,'verification.json'),JSON.stringify(report,null,2));
} finally {await browser.close().catch(()=>{});}
