// Load navbar and footer components and initialize UI behaviors
async function loadComponent(path, selector){
  const res = await fetch(path);
  const html = await res.text();
  const container = document.querySelector(selector);
  if(container) container.innerHTML = html;
}

function initUI(){
  // loader
  const loader = document.getElementById('loader');
  setTimeout(()=>loader && (loader.style.display='none'),600);
  // navbar scroll shadow
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll',()=>{
    const n = document.querySelector('.navbar');
    if(!n) return;
    if(window.scrollY>30) n.classList.add('scrolled'); else n.classList.remove('scrolled');
  });
  // hamburger toggle
  // accessible hamburger toggle: slide-in menu with backdrop
  const hamburger = document.getElementById('hamburger');
  let backdrop = null;
  function closeMenu(){ document.body.classList.remove('menu-open'); if(hamburger) hamburger.setAttribute('aria-expanded','false'); if(backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop); }
  function openMenu(){ document.body.classList.add('menu-open'); if(hamburger) hamburger.setAttribute('aria-expanded','true'); if(!backdrop){ backdrop = document.createElement('div'); backdrop.className = 'menu-backdrop'; backdrop.addEventListener('click', closeMenu); document.body.appendChild(backdrop); } }
  document.body.addEventListener('click', e => {
    const target = e.target;
    if(!target) return;
    if(target.id === 'hamburger' || target.classList.contains('hamburger')){
      // toggle
      if(document.body.classList.contains('menu-open')) closeMenu(); else openMenu();
    }
    // close when a mobile nav link is clicked
    if(target.closest && target.closest('.nav-links')){ if(document.body.classList.contains('menu-open')) closeMenu(); }
  });
  // mobile search toggle: creates an accessible search overlay
  const searchToggle = document.getElementById('searchToggle');
  let searchOverlay = null;
  function closeSearch(){ if(searchOverlay && searchOverlay.parentNode) searchOverlay.parentNode.removeChild(searchOverlay); searchOverlay = null; if(searchToggle) searchToggle.setAttribute('aria-expanded','false'); }
  function openSearch(){ if(searchOverlay) return; if(searchToggle) searchToggle.setAttribute('aria-expanded','true');
    searchOverlay = document.createElement('div'); searchOverlay.className = 'mobile-search-overlay';
    searchOverlay.innerHTML = `<div class="search-panel" role="dialog" aria-modal="true"><input id="mobileSearchInput" placeholder="Search sweets, snacks, pickles..." aria-label="Search products"><button class="close-search" aria-label="Close search">✕</button></div>`;
    document.body.appendChild(searchOverlay);
    const input = document.getElementById('mobileSearchInput'); const closeBtn = searchOverlay.querySelector('.close-search');
    setTimeout(()=> input && input.focus(),50);
    // close handlers
    closeBtn && closeBtn.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', e=>{ if(e.target===searchOverlay) closeSearch(); });
    // submit on Enter
    input && input.addEventListener('keypress', e=>{ if(e.key==='Enter'){ localStorage.setItem('lastSearch', input.value); window.location='products.html'; } });
  }
  // wire up clicks for search toggle
  document.body.addEventListener('click', e=>{
    const t = e.target;
    if(!t) return;
    if(t.id === 'searchToggle' || t.classList && t.classList.contains('search-toggle')){
      if(searchOverlay) closeSearch(); else openSearch();
    }
  });
  // search enter to products
  const navSearch = document.getElementById('navSearch');
  if(navSearch){ navSearch.addEventListener('keypress',e=>{ if(e.key==='Enter'){ localStorage.setItem('lastSearch', navSearch.value); window.location='products.html'; } }); }
  // top button
  const topBtn = document.getElementById('topBtn');
  if(topBtn){ window.addEventListener('scroll',()=>{ if(window.scrollY>300) topBtn.style.display='block'; else topBtn.style.display='none'; }); topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})); }
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await loadComponent('components/navbar.html','#nav-placeholder');
  await loadComponent('components/footer.html','#footer-placeholder');
  initUI();
});
