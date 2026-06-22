
var nav=document.getElementById('nav');
window.addEventListener('scroll',function(){nav.classList.toggle('nav--scrolled',window.scrollY>40)});
var burger=document.getElementById('burger');
var menu=document.getElementById('menu');
if(burger&&menu){
  burger.addEventListener('click',function(){burger.classList.toggle('open');menu.classList.toggle('open')});
  document.querySelectorAll('.m2__close, #menu-close').forEach(function(b){b.addEventListener('click',function(){burger.classList.remove('open');menu.classList.remove('open')})});
}



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
