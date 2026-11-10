import {ANALYTICS as A} from './data'
// Loads the chosen analytics script only on the live site (not in dev)
if(import.meta.env.PROD&&A){
  const add=(src,attrs={})=>{const s=document.createElement('script');s.async=true;s.src=src;Object.entries(attrs).forEach(([k,v])=>s.setAttribute(k,v));document.head.appendChild(s)}
  try{
    if(A.goatcounter)add('https://gc.zgo.at/count.js',{'data-goatcounter':'https://'+A.goatcounter+'.goatcounter.com/count'})
    else if(A.plausible)add('https://plausible.io/js/script.js',{defer:'',  'data-domain':A.plausible})
    else if(A.ga){add('https://www.googletagmanager.com/gtag/js?id='+A.ga);window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',A.ga)}
  }catch{}
}
