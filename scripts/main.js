// scripts/main.js
document.addEventListener('DOMContentLoaded', function(){
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const sel = this.getAttribute('href');
      if (!sel || sel === '#') return;
      const t = document.querySelector(sel);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  window.sendEvent = function(name, params = {}) { try { if (window.gtag) window.gtag('event', name, params); } catch(e){} };
});
