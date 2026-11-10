import React,{useState,useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import './styles.css'
import './analytics'
import {P} from './data'
try{document.documentElement.dataset.theme='dark';document.documentElement.dataset.accent=localStorage.getItem('accent2')||'brown'}catch{document.documentElement.dataset.accent='brown'}
let LANG='en';try{LANG=localStorage.getItem('lang')||'en'}catch{}
const tr=(a,b)=>LANG==='bn'?b:a
const Section=({id,title,children})=><section id={id} className="page in"><h2 className="sec">{title}</h2>{children}</section>
const EN_T=['Typing fast is useful, but typing correctly is what makes data entry work valuable.','Practice a few minutes every day and your speed will improve week by week.','Data entry needs focus, speed and accuracy. I check every line before I save the file.','A good website is simple, fast and easy to use on every phone and computer.','Learning a little every day builds skills that last for a whole life.']
const BN_T=['প্রতিদিন কিছুক্ষণ অনুশীলন করলে টাইপিংয়ের গতি ধীরে ধীরে বাড়তে থাকে।','একটি ভালো ওয়েবসাইট সহজ, দ্রুত এবং সব ফোনে সুন্দরভাবে চলে।','আমি কম্পিউটার অপারেটর হিসেবে কাজ করি এবং প্রতিদিন নতুন কিছু শিখতে ভালোবাসি।','নির্ভুল ও দ্রুত টাইপ করা ডাটা এন্ট্রির সবচেয়ে গুরুত্বপূর্ণ দক্ষতা।']
function Typing(){const[lang,setLang]=useState('en');const[i,setI]=useState(0);const[val,setVal]=useState('');const[t0,setT0]=useState(0);const[el,setEl]=useState(0);const[done,setDone]=useState(false);const[dur,setDur]=useState(60);const[best,setBest]=useState(()=>{try{return +localStorage.getItem('bestwpm')||0}catch{return 0}})
const list=lang==='en'?EN_T:BN_T,txt=list[i%list.length],ch=[...txt],ty=[...val]
useEffect(()=>{if(!t0||done)return;const id=setInterval(()=>{const e=(Date.now()-t0)/1000;setEl(e);if(e>=dur)setDone(true)},200);return()=>clearInterval(id)},[t0,done,dur])
const reset=(l=lang)=>{const n=l==='en'?EN_T:BN_T;setLang(l);setI(Math.floor(Math.random()*n.length));setVal('');setT0(0);setEl(0);setDone(false)}
const on=e=>{if(done)return;const v=e.target.value;if(!t0)setT0(Date.now());setVal(v);if([...v].length>=ch.length){setEl((Date.now()-(t0||Date.now()))/1000);setDone(true)}}
const ok=ty.filter((c,k)=>c===ch[k]).length,acc=ty.length?Math.round(ok/ty.length*100):100,ws=txt.split(' '),vs=val.trim()?val.trim().split(/\s+/):[],cw=vs.filter((w,k)=>w===ws[k]).length,wpm=el>2?Math.round(cw/(Math.max(el,1)/60)):0
useEffect(()=>{if(done&&wpm>best){setBest(wpm);try{localStorage.setItem('bestwpm',String(wpm))}catch{}}},[done])
return <Section id="typing" title={tr('Typing Speed Test','টাইপিং স্পিড টেস্ট')}><p className="lead">Try my typing test. Type the sentence below as fast and as correctly as you can (choose 30, 60 or 120 seconds).</p>
<div className="card tt"><div className="row">{[30,60,120].map(n=><button key={n} className={'chip'+(dur===n?' on':'')} onClick={()=>{setDur(n);reset()}}>{n}s</button>)}<span className="sep"/><button className={'chip'+(lang==='en'?' on':'')} onClick={()=>reset('en')}>English</button><button className={'chip'+(lang==='bn'?' on':'')} onClick={()=>reset('bn')}>বাংলা</button></div>
<p className="sample" lang={lang}>{ch.map((c,k)=><span key={k} className={k<ty.length?(ty[k]===c?'ok':'bad'):k===ty.length?'cur':''}>{c}</span>)}</p>
<textarea rows="3" value={val} onChange={on} disabled={done} placeholder={lang==='en'?'Start typing here…':'এখানে টাইপ করা শুরু করুন…'} aria-label="Typing area" spellCheck="false" autoComplete="off"/>
<div className="stats tstats"><div className="stat"><b>{wpm}</b><span>{tr('Words / min','শব্দ / মিনিট')}</span></div><div className="stat"><b>{acc}%</b><span>{tr('Accuracy','নির্ভুলতা')}</span></div><div className="stat"><b>{Math.max(0,Math.ceil(dur-el))}s</b><span>{tr('Time left','বাকি সময়')}</span></div></div>
<div className="row">{best>0&&<span className="note">{tr('Your best on this device','এই ডিভাইসে আপনার সেরা')}: {best} WPM</span>}<button className="btn" onClick={()=>reset()}>{done?tr('Try again','আবার চেষ্টা করুন'):tr('New sentence','নতুন বাক্য')}</button>{lang==='bn'&&<span className="note">Bangla typing needs a Bangla keyboard (e.g. Avro).</span>}</div>{done&&<p className="ok">Finished! Speed {wpm} WPM, accuracy {acc}%.</p>}</div></Section>}

const Logo=()=><svg width="34" height="34" viewBox="0 0 64 64" aria-label="MH logo"><rect width="64" height="64" rx="14" fill="#000"/><path d="M12 46V18l10 14 10-14v28M38 18v28M54 18v28M38 32h16" style={{stroke:'var(--g1)'}} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
createRoot(document.getElementById('root')).render(<><div className="bg" aria-hidden="true"/><header className="tp-head"><a href="/" aria-label="Home" className="tp-logo"><Logo/><b>{P.short}</b></a><a className="btn ghost" href="/">{tr('← Back to Portfolio','← পোর্টফোলিওতে ফিরুন')}</a></header><div className="content"><Typing/><footer><p>{tr('Want data entry or office work done?','ডাটা এন্ট্রি বা অফিসের কাজ করাতে চান?')} <a href="/#hire" className="lnk">{tr('Order a service →','কাজ অর্ডার করুন →')}</a></p><p>© {new Date().getFullYear()} {P.name}</p></footer></div></>)
