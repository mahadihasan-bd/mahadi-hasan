// Theme engine: give it ONE color, it builds the whole palette (buttons, glow, gradients, text accents).
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v))
export const isHex=h=>/^#[0-9a-f]{6}$/i.test(h||'')
function toHsl(hex){let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255
const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let h=0,s=0
if(d){s=d/(1-Math.abs(2*l-1));h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360}return[h,s,l]}
function toRgb(h,s,l){const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2
const[r,g,b]=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return[r+m,g+m,b+m].map(v=>Math.round(v*255))}
const hex=a=>'#'+a.map(v=>v.toString(16).padStart(2,'0')).join('')
const lum=a=>{const f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(a[0])+.7152*f(a[1])+.0722*f(a[2])}
const contrastWhite=a=>1.05/(lum(a)+.05)
export function palette(base){const[h,s0,l0]=toHsl(base);const s=clamp(s0,.45,.95)
const g1=toRgb(h,s,clamp(l0,.5,.62))                       // main bright accent
let l=.42,ac=toRgb(h,s,l);while(contrastWhite(ac)<4.5&&l>.15){l-=.02;ac=toRgb(h,s,l)} // dark shade: white text stays readable
const hi=toRgb(h,clamp(s,.5,.85),.76)                      // soft light tint
return{'--ac':hex(ac),'--g1':hex(g1),'--g2':hex(g1),'--hi':hex(hi),'--rgb':g1.join(',')}}
export function applyTheme(base){if(!isHex(base))return
const go=()=>{const st=document.documentElement.style;Object.entries(palette(base)).forEach(([k,v])=>st.setProperty(k,v))}
const still=matchMedia('(prefers-reduced-motion: reduce)').matches
document.startViewTransition&&!still?document.startViewTransition(go):go()}
