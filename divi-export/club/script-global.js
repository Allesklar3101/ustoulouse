
// Drag partenaires
document.querySelectorAll('.partenaires-track-wrap').forEach(wrap=>{
  const track=wrap.querySelector('.partenaires-track');
  let isDown=false,startX,sl;
  wrap.addEventListener('mousedown',e=>{isDown=true;wrap.classList.add('dragging');startX=e.pageX-wrap.offsetLeft;sl=wrap.scrollLeft});
  document.addEventListener('mouseup',()=>{isDown=false;wrap.classList.remove('dragging')});
  wrap.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();wrap.scrollLeft=sl-(e.pageX-wrap.offsetLeft-startX)*1.5});
  wrap.addEventListener('touchstart',e=>{startX=e.touches[0].pageX;sl=wrap.scrollLeft},{passive:true});
  wrap.addEventListener('touchmove',e=>{wrap.scrollLeft=sl-(e.touches[0].pageX-startX)*1.5},{passive:true});
});
// Drag timeline
document.querySelectorAll('.tl-track').forEach(tl=>{
  let isDown=false,startX,sl;
  tl.addEventListener('mousedown',e=>{isDown=true;tl.classList.add('drag');startX=e.pageX;sl=tl.scrollLeft});
  document.addEventListener('mouseup',()=>{isDown=false;tl.classList.remove('drag')});
  tl.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();tl.scrollLeft=sl-(e.pageX-startX)*1.6});
  tl.addEventListener('touchstart',e=>{startX=e.touches[0].pageX;sl=tl.scrollLeft},{passive:true});
  tl.addEventListener('touchmove',e=>{tl.scrollLeft=sl-(e.touches[0].pageX-startX)*1.6},{passive:true});
});



(function(){
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('ustMenu');
  var closeBtn = document.getElementById('menuClose');
  if(!burger || !menu) return;

  // Nav scroll
  window.addEventListener('scroll', function(){
    if(nav) nav.classList.toggle('ust-nav--scrolled', window.scrollY > 40);
  }, {passive:true});

  function openMenu(){
    menu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  menu.addEventListener('click', function(e){ if(e.target === menu) closeMenu(); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  // Sous-menus
  window.toggleSub = function(btn){
    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    // Ferme tous les autres
    document.querySelectorAll('.ust-menu__link[aria-expanded="true"]').forEach(function(b){
      if(b !== btn){
        b.setAttribute('aria-expanded','false');
        var s = b.parentElement.querySelector('.ust-menu__sub');
        if(s) s.classList.remove('open');
      }
    });
    // Toggle celui-ci
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    var sub = btn.parentElement.querySelector('.ust-menu__sub');
    if(sub) sub.classList.toggle('open', !isOpen);
  };
})();



(function(){
  var prev=document.getElementById('m2Preview');
  if(!prev) return;
  var rows=document.querySelectorAll('.m2__row');
  var ico=prev.querySelector('.m2__pv-ico i');
  var ttl=prev.querySelector('.m2__pv-title');
  var dsc=prev.querySelector('.m2__pv-desc');
  function set(r){
    rows.forEach(function(x){x.classList.remove('active');});
    r.classList.add('active');
    ico.className='ti '+r.getAttribute('data-ico');
    ttl.textContent=r.getAttribute('data-title');
    dsc.textContent=r.getAttribute('data-desc');
    prev.classList.remove('m2__preview--in');void prev.offsetWidth;prev.classList.add('m2__preview--in');
  }
  rows.forEach(function(r){
    r.addEventListener('mouseenter',function(){set(r);});
    r.addEventListener('focus',function(){set(r);});
  });
  if(rows[0]) rows[0].classList.add('active');
})();
