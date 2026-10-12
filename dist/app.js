const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-label','Open navigation');
}
menu.addEventListener('click',()=>{
  const open = menu.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header') || event.target.closest('nav a')) closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
window.matchMedia('(min-width:601px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){
  const sections = [...document.querySelectorAll('.snap-section')];
  const dots = [...document.querySelectorAll('.section-dots a')];
  const header = document.querySelector('.site-header');
  const observer = new IntersectionObserver(entries=>{
    const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    header.classList.toggle('on-light',visible.target.classList.contains('light'));
    dots.forEach(dot=>{if(dot.hash===`#${visible.target.id}`)dot.setAttribute('aria-current','location');else dot.removeAttribute('aria-current');});
  },{rootMargin:'-15% 0px -45% 0px',threshold:[0,.1,.4]});
  sections.forEach(section=>observer.observe(section));
  if(!motion.matches){
    const targets=document.querySelectorAll('.panel-intro, .panel-top, .featured-layout, .home-experiences, .research-results');
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');reveal.unobserve(entry.target);}}),{threshold:.08});
    targets.forEach(target=>{target.dataset.reveal='';reveal.observe(target);});
    document.body.classList.add('motion-ready');
  }
}
const copy=document.querySelector('.copy-email');
if(copy && navigator.clipboard && window.isSecureContext){
  copy.hidden=false;
  copy.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText('lndmeng@g.ucla.edu');copy.textContent='Copied';document.querySelector('.copy-status').textContent='Email address copied.';setTimeout(()=>{copy.textContent='Copy email';},2000);}
    catch{document.querySelector('.copy-status').textContent='Copy the email directly: lndmeng@g.ucla.edu.';}
  });
}
