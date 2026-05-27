document.addEventListener('DOMContentLoaded',()=>{
  const box = document.getElementById('searchBox') || document.getElementById('navSearch');
  if(!box) return;
  box.addEventListener('input',e=>{
    const q = e.target.value.trim().toLowerCase();
    const filtered = products.filter(p=> p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    const grid = document.getElementById('product-list') || document.getElementById('featured-grid');
    if(!grid) return;
    grid.innerHTML = '';
    filtered.forEach(p=>{ const card=document.createElement('article'); card.className='product-card'; card.innerHTML=`<img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"><div class="product-body"><h3>${p.name}</h3><p class="price">₹${p.price}/kg</p><p>${p.description}</p><div class="actions"><a class="btn" href="product-details.html?id=${p.id}">View Details</a></div></div>`; grid.appendChild(card)});
  });
});
