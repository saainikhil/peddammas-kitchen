document.addEventListener('DOMContentLoaded',()=>{
  const sliderContainer = document.getElementById('hero-slider');
  if(!sliderContainer) return;
  const slider = sliderContainer.querySelector('.slides');
  const slides = sliderContainer.querySelectorAll('.slide');
  const dotsWrap = document.getElementById('dots');
  let idx=0;
  function show(i){
    slider.style.transform = `translateX(${-i*100}%)`;
    // toggle active class for slide animations
    slides.forEach((s,si)=> s.classList.toggle('active', si===i));
    if(dotsWrap) [...dotsWrap.children].forEach((d,di)=>d.classList.toggle('active',di===i));
  }
  function createDots(){ if(!dotsWrap) return; slides.forEach((s,i)=>{ const d=document.createElement('div'); d.className='dot'; d.addEventListener('click',()=>{idx=i;show(idx)}); dotsWrap.appendChild(d)}); }
  function next(){ idx=(idx+1)%slides.length; show(idx); }
  function prev(){ idx=(idx-1+slides.length)%slides.length; show(idx); }
  createDots(); show(0);
  const nextBtn = document.getElementById('next'); const prevBtn = document.getElementById('prev');
  if(nextBtn) nextBtn.addEventListener('click',()=>{ next(); });
  if(prevBtn) prevBtn.addEventListener('click',()=>{ prev(); });
});
